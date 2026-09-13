import { PeerConnection } from "node-datachannel";

let peerConnection;
export async function createConnection() {
    peerConnection = new RTCPeerConnection();
    const datachannel = peerConnection.createDataChannel('chat');
    
    datachannel.onmessage = (event) => {
        console.log('Message received:', event.data);    
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer)

    await iceGather(peerConnection);

    return JSON.stringify(peerConnection.localDescription)
}

function iceGather(pc){
    return new Promise(()=>{
        if(pc.iceGatheringState === 'complete'){
            resolve();
        }else{
            pc.onicegatheringstatechange = () => {
                if(pc.iceGatheringState === 'complete') resolve();
            };
        }
    });
}