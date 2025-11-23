const createGroupBtn = document.getElementById('create-group-btn');
const joinGroupBtn = document.getElementById('join-group-btn');
const createGroupForm = document.getElementById('create-group-form');
const joinGroupForm = document.getElementById('join-group-form');
const homePage = document.getElementById('home-page');
const chatPage = document.getElementById('chat-page');
const homeContainer = document.querySelector('.home-container');
const createBtn = document.getElementById('create-btn');
const creatorNameInput = document.getElementById('creator-name');
const joinBtn = document.getElementById('join-btn');
const joinerNameInput = document.getElementById('joiner-name');
const groupKeyInput = document.getElementById('group-key');
const membersList = document.getElementById('members-list');
const chatMessages = document.querySelector('.chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

const userColors = {};
let username = '';
let pc;
let dataChannel;

createGroupBtn.addEventListener('click', () => {
    homeContainer.classList.add('hidden');
    createGroupForm.classList.remove('hidden');
});

joinGroupBtn.addEventListener('click', () => {
    homeContainer.classList.add('hidden');
    joinGroupForm.classList.remove('hidden');
});

createBtn.addEventListener('click', () => {
    const creatorName = creatorNameInput.value;
    if (creatorName) {
        username = creatorName;
        const groupKey = generateGroupKey(creatorName);
        
        homePage.classList.add('hidden');
        chatPage.classList.remove('hidden');
        addMemberToList(creatorName);
        assignColor(creatorName);
        
        startWebRTC(true, groupKey);
    } else {
        alert('Please enter your name.');
    }
});

joinBtn.addEventListener('click', () => {
    const joinerName = joinerNameInput.value;
    const groupKey = groupKeyInput.value;

    if (joinerName && groupKey) {
        username = joinerName;
        homePage.classList.add('hidden');
        chatPage.classList.remove('hidden');
        addMemberToList(joinerName);
        assignColor(joinerName);

        startWebRTC(false, groupKey);
    } else {
        alert('Please enter your name and the group key.');
    }
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        addMessage(username, message);
        dataChannel.send(JSON.stringify({type: 'chat', sender: username, message: message}));
        messageInput.value = '';
    }
});

function startWebRTC(isCreator, groupKey) {
    pc = new RTCPeerConnection();

    pc.onicecandidate = (e) => {
        if (e.candidate) {
            // Send the candidate to the other peer
            console.log('ICE Candidate:', JSON.stringify(e.candidate));
        }
    };

    if (isCreator) {
        dataChannel = pc.createDataChannel('chat');
        setupDataChannel();

        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .then(() => {
                // Send the offer to the other peer
                console.log('Offer:', JSON.stringify(pc.localDescription));
                prompt("Copy this offer and share it with the other user:", JSON.stringify(pc.localDescription));
            });
    } else {
        pc.ondatachannel = (e) => {
            dataChannel = e.channel;
            setupDataChannel();
        };

        const offer = JSON.parse(prompt("Paste the offer from the creator:"));
        if(offer) {
            pc.setRemoteDescription(offer)
                .then(() => pc.createAnswer())
                .then(answer => pc.setLocalDescription(answer))
                .then(() => {
                    // Send the answer to the other peer
                    console.log('Answer:', JSON.stringify(pc.localDescription));
                    prompt("Copy this answer and share it with the creator:", JSON.stringify(pc.localDescription));
                });
        }
    }
}

function setupDataChannel() {
    dataChannel.onopen = () => {
        console.log('Data channel is open');
    };

    dataChannel.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'chat') {
            addMessage(data.sender, data.message);
        }
    };
}


function generateGroupKey(creatorName) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const time = now.getTime();

    const random1 = Math.floor(Math.random() * 1000);
    const random2 = Math.floor(Math.random() * 1000);
    const random3 = Math.floor(Math.random() * 1000);
    const random4 = Math.floor(Math.random() * 1000);

    const rawKey = `${year}-${random1}-${month}-${random2}-${day}-${random3}-${time}-${random4}`;

    // Convert the raw key to a hexadecimal string
    let hexKey = '';
    for (let i = 0; i < rawKey.length; i++) {
        hexKey += rawKey.charCodeAt(i).toString(16);
    }

    return `${hexKey}-${creatorName}`;
}

function addMemberToList(name) {
    const li = document.createElement('li');
    li.textContent = name;
    if (!userColors[name]) {
        assignColor(name);
    }
    li.style.color = userColors[name];
    membersList.appendChild(li);
}

function assignColor(userName) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    userColors[userName] = color;
}

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    const senderElement = document.createElement('span');
    senderElement.classList.add('sender');
    senderElement.textContent = sender;
    if (!userColors[sender]) {
        assignColor(sender);
    }
    senderElement.style.color = userColors[sender];

    const textElement = document.createElement('span');
    textElement.textContent = `: ${message}`;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
