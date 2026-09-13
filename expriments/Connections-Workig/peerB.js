const nodeDataChannel = require('node-datachannel');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pc = new nodeDataChannel.PeerConnection('peerB', {
  iceServers: ['stun:stun.l.google.com:19302']
});

let localSdp = '';
let localType = '';
const candidates = [];

pc.onLocalDescription((sdp, type) => {
  localSdp = sdp;
  localType = type;
});

pc.onLocalCandidate((candidate, mid) => {
  candidates.push({ candidate, mid });
});

pc.onGatheringStateChange((state) => {
  if (state === 'complete') {
    const token = {
      sdp: localSdp,
      type: localType,
      ice: candidates
    };

    fs.writeFileSync('./tokenB.txt', JSON.stringify(token));
   
  }
});

pc.onDataChannel((dc) => {

  dc.onOpen(() => {
    console.log('<---Ready--->');
    
    rl.on('line', (msg) => {

      dc.sendMessage(msg);
    
    });
  });

  dc.onMessage((msg) => {
  
    console.log('peerA:', msg);

  });

});


rl.question('If tokenA.txt ready', () => {
  
  const raw = fs.readFileSync('./tokenA.txt', 'utf-8');
  
  fs.unlinkSync('./tokenA.txt');
  const offer = JSON.parse(raw);

  pc.setRemoteDescription(offer.sdp, offer.type);
  for (const { candidate, mid } of offer.ice) {
    pc.addRemoteCandidate(candidate, mid);
  }

});