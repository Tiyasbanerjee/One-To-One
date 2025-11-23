function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".tab-link.active").click();
    showPage('home-page');
});

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
let isAdmin = false;

createBtn.addEventListener('click', () => {
    const creatorName = creatorNameInput.value;
    if (creatorName) {
        username = creatorName;
        const groupKey = generateGroupKey(creatorName);
        
        showPage('chat-page');
        addMemberToList(creatorName, true);
        assignColor(creatorName);
        
        isAdmin = true;
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
        showPage('loading-page');

        // Simulate a delay for joining
        setTimeout(() => {
            // In a real app, you would have logic to check if the join was successful
            showPage('chat-page');
            addMemberToList(joinerName, false);
            assignColor(joinerName);

            startWebRTC(false, groupKey);
        }, 2000);
    } else {
        alert('Please enter your name and the group key.');
    }
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        addMessage(username, message);
        if (dataChannel) {
            dataChannel.send(JSON.stringify({type: 'chat', sender: username, message: message}));
        }
        messageInput.value = '';
    }
});

function startWebRTC(isCreator, groupKey) {
    pc = new RTCPeerConnection();

    pc.onicecandidate = (e) => {
        if (e.candidate) {
            // Send the candidate to the other peer
            // This will be done through a signaling server in a real application
            console.log('ICE Candidate:', JSON.stringify(e.candidate));
        }
    };

    if (isCreator) {
        dataChannel = pc.createDataChannel('chat');
        setupDataChannel();

        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .then(() => {
                // In a real app, you'd send this to a signaling server
                console.log('Offer:', JSON.stringify(pc.localDescription));
                const groupKeyElement = document.createElement('div');
                groupKeyElement.innerHTML = `Share this group key with others: <strong>${groupKey}</strong><br><br>And this offer: <strong>${JSON.stringify(pc.localDescription)}</strong>`;
                document.getElementById('create-group-form').appendChild(groupKeyElement);

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
                    // In a real app, you'd send this to a signaling server
                    prompt("Copy this answer and share it with the creator:", JSON.stringify(pc.localDescription));
                });
        }
    }
}

function setupDataChannel() {
    dataChannel.onopen = () => {
        console.log('Data channel is open');
        dataChannel.send(JSON.stringify({type: 'join', sender: username}));
    };

    dataChannel.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'chat') {
            addMessage(data.sender, data.message);
        } else if (data.type === 'join') {
            if (isAdmin) {
                const memberRequests = document.getElementById('member-requests');
                const requestElement = document.createElement('div');
                requestElement.classList.add('request');
                requestElement.innerHTML = `
                    <span>${data.sender} wants to join.</span>
                    <div class="request-actions">
                        <button onclick="acceptRequest('${data.sender}')">Accept</button>
                        <button onclick="rejectRequest('${data.sender}')">Reject</button>
                    </div>
                `;
                memberRequests.appendChild(requestElement);
            }
        } else if (data.type === 'welcome') {
            data.members.forEach(member => {
                if(member.name !== username) {
                    addMemberToList(member.name, member.isAdmin);
                }
            });
        } else if (data.type === 'new-member') {
            addMemberToList(data.sender, false);
        } else if (data.type === 'member-left') {
            removeMemberFromList(data.sender);
        }
    };
}

function acceptRequest(newMemberName) {
    // In a real app, you'd send a welcome message with the member list
    const members = [];
    document.querySelectorAll('#members-list li').forEach(li => {
        members.push({name: li.textContent, isAdmin: li.dataset.isAdmin === 'true'});
    });
    dataChannel.send(JSON.stringify({type: 'welcome', members: members}));
    
    // Announce the new member to others
    dataChannel.send(JSON.stringify({type: 'new-member', sender: newMemberName}));
    addMemberToList(newMemberName, false);
    
    // Remove the request
    const memberRequests = document.getElementById('member-requests');
    const requestElement = Array.from(memberRequests.children).find(child => child.textContent.includes(newMemberName));
    if (requestElement) {
        memberRequests.removeChild(requestElement);
    }
}

function rejectRequest(memberName) {
    // In a real app, you'd send a rejection message
    console.log(`Rejected ${memberName}`);
    // Remove the request
    const memberRequests = document.getElementById('member-requests');
    const requestElement = Array.from(memberRequests.children).find(child => child.textContent.includes(memberName));
    if (requestElement) {
        memberRequests.removeChild(requestElement);
    }
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

function addMemberToList(name, isMemberAdmin) {
    const li = document.createElement('li');
    li.textContent = name;
    li.dataset.isAdmin = isMemberAdmin;
    if (!userColors[name]) {
        assignColor(name);
    }
    li.style.color = userColors[name];

    if(isAdmin && name !== username) {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-member-btn');
        if(isAdmin) {
            removeBtn.classList.add('admin');
        }
        removeBtn.onclick = () => {
            removeMember(name);
        };
        li.appendChild(removeBtn);
    }

    membersList.appendChild(li);
}

function removeMember(name) {
    if(isAdmin) {
        dataChannel.send(JSON.stringify({type: 'member-left', sender: name}));
        removeMemberFromList(name);
    }
}

function removeMemberFromList(name) {
    const li = Array.from(membersList.children).find(child => child.textContent.startsWith(name));
    if (li) {
        membersList.removeChild(li);
    }
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

    if (sender === username) {
        messageElement.classList.add('sent');
    } else {
        messageElement.classList.add('received');
    }

    const senderElement = document.createElement('div');
    senderElement.classList.add('sender');
    senderElement.textContent = sender;
    if(userColors[sender]) {
        senderElement.style.color = userColors[sender];
    }


    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = message;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
