let pc = new RTCPeerConnection();
let channel = pc.createDataChannel("chat");

channel.onopen = () => {
    console.log("Connected to Peer B!");
    channel.send("Hello from Peer A");
};

channel.onmessage = (e) => {
    console.log("Peer B:", e.data);
};

// Generate offer
async function createOffer() {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    console.log("COPY THIS OFFER → send to Peer B:\n");
    console.log(JSON.stringify(pc.localDescription));
}

async function receiveAnswer(answerText) {
    let answer = JSON.parse(answerText);
    await pc.setRemoteDescription(answer);
    console.log("Answer set! P2P connection forming...");
}

// ICE candidates
pc.onicecandidate = (e) => {
    if (e.candidate) {
        console.log("ICE Candidate for Peer B:");
        console.log(JSON.stringify(e.candidate));
    }
};

// Receive ICE from user input
async function addIce(iceText) {
    let ice = JSON.parse(iceText);
    await pc.addIceCandidate(ice);
}

createOffer();
