let pc = new RTCPeerConnection();
let channel;

pc.ondatachannel = (event) => {
    channel = event.channel;

    channel.onopen = () => {
        console.log("Connected to Peer A!");
        channel.send("Hello from Peer B");
    };

    channel.onmessage = (e) => {
        console.log("Peer A:", e.data);
    };
};

// Receive offer from A
async function receiveOffer(offerText) {
    let offer = JSON.parse(offerText);
    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    console.log("COPY THIS ANSWER → send to Peer A:\n");
    console.log(JSON.stringify(pc.localDescription));
}

// ICE candidates
pc.onicecandidate = (e) => {
    if (e.candidate) {
        console.log("ICE Candidate for Peer A:");
        console.log(JSON.stringify(e.candidate));
    }
};

// Receive ICE
async function addIce(iceText) {
    let ice = JSON.parse(iceText);
    await pc.addIceCandidate(ice);
}
