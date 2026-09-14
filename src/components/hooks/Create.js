
let peerConnection;
let notifyMessage;

export async function createConnection(onmessage) {
    peerConnection = new RTCPeerConnection();
    const datachannel = peerConnection.createDataChannel('chat');
    
    notifyMessage = onmessage
    datachannel.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        const organized_msg = {type:"incomeing",text:msg}
        notifyMessage(organized_msg)    
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer)

    await iceGather(peerConnection);

    return JSON.stringify(peerConnection.localDescription)
    
}

function iceGather(pc){
    return new Promise((resolve)=>{
        if(pc.iceGatheringState === 'complete'){
            resolve();
        }else{
            pc.onicegatheringstatechange = () => {
                if(pc.iceGatheringState === 'complete') resolve();
            };
        }
    });
}