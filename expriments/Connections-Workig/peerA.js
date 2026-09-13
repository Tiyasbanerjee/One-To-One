const nodeDataChannel = require('node-datachannel');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pc = new nodeDataChannel.PeerConnection('peerA', {
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

    fs.writeFileSync('./tokenA.txt', JSON.stringify(token));

    rl.question('If tokenB.txt ready-->', () => {

      const raw = fs.readFileSync('./tokenB.txt', 'utf-8');
      fs.unlinkSync('./tokenB.txt');

      const answer = JSON.parse(raw);

      pc.setRemoteDescription(answer.sdp, answer.type);
      
      for (const { candidate, mid } of answer.ice) {
        pc.addRemoteCandidate(candidate, mid);
      }
    });
  }
});

const dc = pc.createDataChannel('chat');

dc.onOpen(() => {
  console.log('<---Ready--->');

  rl.on('line', (msg) => {
    dc.sendMessage(msg);
  });

});

dc.onMessage((msg) => {

  console.log('peerB:', msg);

});