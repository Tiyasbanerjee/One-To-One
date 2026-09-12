const nodeDataChanel = require('node-datachannel');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pc = new nodeDataChanel.PeerConnection('Peer_A', {
  iceServers: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302'
  ]
});

let offerSdp = '';
let offerType = '';
const candidates = [];

pc.onLocalDescription((sdp, type) => {
  offerSdp = sdp;
  offerType = type;
});

// Collect candidates as they arrive from STUN/host interfaces
pc.onLocalCandidate((candidate) => {
  candidates.push(candidate);
});

pc.onGatheringStateChange((state) => {
  if (state === 'complete') {
    // Append all gathered candidates directly into the SDP
    const candidateLines = candidates.map(c => `a=${c}\r\n`).join('');
    const fullSdp = offerSdp + candidateLines;

    const token = {
      sdp: fullSdp,
      type: offerType
    };

    console.log('\nMy token:---');
    console.log(token);
    console.log('<-------->');

    rl.question('\nPeer B token input field--->:\n', (answerStr) => {
      const answer = JSON.parse(answerStr);
      pc.setRemoteDescription(answer.sdp, answer.type);
      console.log('<----->');
      rl.close();
    });
  }
});

const dc = pc.createDataChannel('chat');

dc.onOpen(() => {
  console.log('ready...');
  dc.sendMessage('Hello-imA!');
});

dc.onMessage((msg) => {
  console.log(`Peer B: ${msg}`);
});
