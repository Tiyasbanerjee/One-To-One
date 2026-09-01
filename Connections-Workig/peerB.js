const nodeDataChanel = require('node-datachannel'); // main lib

const readline = require('readline');  //needed for terminal testing

// readline interface for terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// stun servers.
const pc = new nodeDataChanel.PeerConnection('Peer_B', {
  iceServers: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302'
  ]
});

// event listener
let dc;
pc.onDataChannel((channel) => {
  dc = channel;

  dc.onOpen(() => {

    rl.on('line', (line) => {
      dc.sendMessage(line);
    });

  });

  dc.onMessage((msg) => {
    console.log(`Peer A: ${msg}`);
  });

});


// handshake
pc.onLocalDescription((sdp, type) => {
  console.log(JSON.stringify({ sdp, type }));
});

rl.question('peer A offer:\n', (offerStr) => {
  const offer = JSON.parse(offerStr);

  pc.setRemoteDescription(offer.sdp, offer.type);
});
