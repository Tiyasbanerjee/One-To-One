const nodeDataChanel = require('node-datachannel'); // main lib

const readline = require('readline');  //needed for terminal testing

// readline interface for terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// stun servers.
const pc = new nodeDataChanel.PeerConnection('Peer_A', {
  iceServers: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302'
  ]
});

const dc = pc.createDataChannel('chat');


// error handeleing
pc.onStateChange((state) => {
  console.log(`Connection state: ${state}`);
});
pc.onGatheringStateChange((state) => {
  console.log(`ICE Gathering state: ${state}`);
});



// handshake/token exchange-->
pc.onLocalDescription((sdp,type)=>{
    console.log(JSON.stringify({sdp,type}));
})

rl.question('ready\n', (answerStr) => {
  const answer = JSON.parse(answerStr);
  pc.setRemoteDescription(answer.sdp, answer.type);
});



// event listeners set up---->

dc.onOpen(() => {
  console.log('ready...');
  dc.sendMessage('Hello-imA!');
});

dc.onMessage((msg) => {
  console.log(`Peer B: ${msg}`);
});

//---

