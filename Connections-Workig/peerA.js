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
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302'
  ]
});

const dc = pc.createDataChannel('chat');

dc.onOpen = () => {
  console.log('Data channel is open and ready to be used.');
  dc.sendMessage('Hello from Peer A!');
};