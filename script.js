// --- CONFIG ---
const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// --- STATE ---
let pc, dc;
let state = { user: '', color: '', isAdmin: false, members: [] };

// --- UTILS ---
const $ = id => document.getElementById(id);
const show = id => {
    ['view-welcome', 'view-wizard', 'view-chat'].forEach(v => $(v).classList.add('hidden'));
    $(id).classList.remove('hidden');
};
const showStep = id => {
    ['wiz-host-1', 'wiz-host-2', 'wiz-join-1', 'wiz-join-2'].forEach(v => $(v).classList.add('hidden'));
    $(id).classList.remove('hidden');
};
const copyToClip = id => {
    const el = $(id);
    if(el.tagName === 'DIV') {
            navigator.clipboard.writeText(el.innerText);
    } else {
        el.select();
        document.execCommand('copy');
    }
    const original = el.style.borderColor;
    el.style.borderColor = '#10b981';
    setTimeout(() => el.style.borderColor = original, 500);
};

// --- HEX OPTIMIZED KEY GENERATION ---
function generateHexKey(username) {
    const d = new Date();
    // Algorithm: Year-Rand-Month-Rand-Day...
    const components = [
        d.getFullYear(), Math.floor(Math.random()*99),
        d.getMonth()+1, Math.floor(Math.random()*99),
        d.getDate(), Math.floor(Math.random()*999)
    ];
    
    // Convert to Hex String
    const hexPart = components.map(n => n.toString(16).padStart(2, '0')).join('').toUpperCase();
    return `${hexPart}-${username.toUpperCase()}`;
}

// --- BASE64 OPTIMIZATION FOR SDP ---
// This makes the connection token look like a block of text, not JSON code
const encodeSDP = (obj) => btoa(JSON.stringify(obj));
const decodeSDP = (str) => JSON.parse(atob(str));

function generateUserColor(name) {
    const colors = ['#60a5fa', '#f472b6', '#34d399', '#a78bfa', '#fbbf24', '#f87171'];
    let val = 0;
    for(let i=0; i<name.length; i++) val += name.charCodeAt(i);
    return colors[val % colors.length];
}

// --- LOGIC: HOST ---
async function startHostFlow() {
    const name = $('username').value.trim() || 'ADMIN';
    state.user = name;
    state.color = generateUserColor(name);
    state.isAdmin = true;
    state.members = [{name, color: state.color}];
    
    show('view-wizard');
    showStep('wiz-host-1');

    // Generate Group Key
    $('wiz-group-key').innerText = generateHexKey(name);

    // Init WebRTC
    pc = new RTCPeerConnection(rtcConfig);
    dc = pc.createDataChannel('chat');
    setupDataChannel(dc);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Wait for ICE gathering to complete for "One Token" simplicity
    await new Promise(resolve => {
        if (pc.iceGatheringState === 'complete') resolve();
        pc.onicecandidate = e => { if(!e.candidate) resolve(); };
    });

    // Output Optimized Token
    $('wiz-host-token').value = encodeSDP(pc.localDescription);
}

async function finalizeHost() {
    const token = $('wiz-host-paste').value.trim();
    if(!token) return;
    try {
        const answer = decodeSDP(token);
        await pc.setRemoteDescription(answer);
        enterChat();
    } catch(e) { alert("Invalid Token"); }
}

// --- LOGIC: JOIN ---
async function startJoinFlow() {
    const name = $('username').value.trim() || 'GUEST';
    state.user = name;
    state.color = generateUserColor(name);
    show('view-wizard');
    showStep('wiz-join-1');
}

async function processJoin() {
    const tokenStr = $('join-token-input').value.trim();
    if(!tokenStr) return alert("Paste the Security Token first.");

    pc = new RTCPeerConnection(rtcConfig);
    pc.ondatachannel = e => {
        dc = e.channel;
        setupDataChannel(dc);
        dc.onopen = () => {
            dc.send(JSON.stringify({ type: 'join_req', user: state.user, color: state.color }));
            show('view-chat'); // Show chat but wait for approval
        };
    };

    try {
        await pc.setRemoteDescription(decodeSDP(tokenStr));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        // Wait for ICE
        await new Promise(resolve => {
            if (pc.iceGatheringState === 'complete') resolve();
            pc.onicecandidate = e => { if(!e.candidate) resolve(); };
        });

        $('wiz-join-output').value = encodeSDP(pc.localDescription);
        showStep('wiz-join-2');

    } catch(e) { alert("Token Error. Check your input."); }
}

// --- DATA CHANNEL & CHAT ---
function setupDataChannel(channel) {
    channel.onmessage = e => {
        const data = JSON.parse(e.data);
        if(data.type === 'join_req' && state.isAdmin) handleJoinReq(data);
        if(data.type === 'welcome') handleWelcome(data);
        if(data.type === 'msg') renderMsg(data);
    };
}

function sendMsg(e) {
    e.preventDefault();
    const txt = $('msg-input').value.trim();
    if(!txt || !dc || dc.readyState !== 'open') return;
    
    const msg = { type: 'msg', user: state.user, color: state.color, text: txt };
    renderMsg(msg); // Show my own
    dc.send(JSON.stringify(msg)); // Send to peer
    $('msg-input').value = '';
}

function renderMsg(data) {
    const isMe = data.user === state.user;
    const div = document.createElement('div');
    div.className = `flex flex-col ${isMe ? 'items-end' : 'items-start'} fade-in`;
    div.innerHTML = `
        <span class="text-[10px] text-gray-500 mb-1 px-1">${data.user}</span>
        <div class="px-4 py-2 rounded-xl max-w-[80%] break-words ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'}">
            ${data.text.replace(/</g, '&lt;')}
        </div>
    `;
    $('chat-feed').appendChild(div);
    $('chat-feed').scrollTop = 99999;
}

function enterChat() {
    show('view-chat');
    $('connection-status').innerText = "ENCRYPTED LINK ACTIVE";
    $('connection-status').className = "text-xs font-mono text-green-500";
    $('status-light').className = "w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#10b981]";
    updateMembers();
}

// --- ADMIN CONTROLS ---
function handleJoinReq(data) {
    const area = $('request-area');
    area.classList.remove('hidden');
    const div = document.createElement('div');
    div.id = `req-${data.user}`;
    div.className = "bg-black p-2 rounded border border-purple-500/50 flex flex-col gap-2";
    div.innerHTML = `
        <span class="text-white font-bold text-sm">${data.user}</span>
        <div class="flex gap-1">
            <button onclick="accept('${data.user}', '${data.color}')" class="bg-green-600 text-xs px-2 py-1 rounded text-white flex-1">ACCEPT</button>
            <button onclick="reject('${data.user}')" class="bg-red-600 text-xs px-2 py-1 rounded text-white flex-1">DENY</button>
        </div>
    `;
    area.appendChild(div);
}

function accept(user, color) {
    state.members.push({name: user, color});
    $(`req-${user}`).remove();
    if($('request-area').children.length <= 1) $('request-area').classList.add('hidden');
    updateMembers();
    dc.send(JSON.stringify({ type: 'welcome', members: state.members }));
    enterChat();
}

function handleWelcome(data) {
    state.members = data.members;
    updateMembers();
    enterChat();
}

function updateMembers() {
    const ul = $('member-list');
    ul.innerHTML = '';
    state.members.forEach(m => {
        const li = document.createElement('li');
        li.className = "flex items-center gap-2 p-2 hover:bg-white/5 rounded transition-colors";
        li.innerHTML = `<div class="w-2 h-2 rounded-full" style="background:${m.color}"></div><span class="text-sm text-gray-300">${m.name}</span>`;
        ul.appendChild(li);
    });
}

function resetApp() {
    if(pc) pc.close();
    location.reload();
}