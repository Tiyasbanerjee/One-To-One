

let peerConnection;
let notifyMessage;

export async function connectConnection(onmessage) {
    peerConnection = new RTCPeerConnection();
    notifyMessage = onmessage

    peerConnection.ondatachannel = (event) => {
        const datachannel = event.channel;

        datachannel.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            const organized_msg = { type:"incomeing" , text:msg}
            notifyMessage(organized_msg)
        }
    }
}

export async function acceptOffer(offer){
    await peerConnection.setRemoteDescription(offer)

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    await iceGather(peerConnection)

    return JSON.stringify(peerConnection.localDescription)
}

function iceGather(pc){
    return new Promise((resolve)=>{
        if(pc.iceGatheringState==="complete"){
            resolve();
        }else{
            pc.onicegatheringstatechange = () => {
                if (pc.iceGatheringState==="complete") resolve();
            };
        }
    });
}