

let peerConnection;
let notifyMessage;
let datachannel;


export async function connectConnection(onmessage) {
    peerConnection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]});
    notifyMessage = onmessage

    peerConnection.ondatachannel = (event) => {
        datachannel = event.channel;

        datachannel.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            const organized_msg = { type:"incomeing" , text:msg}
            notifyMessage(organized_msg)
          
        }

        datachannel.onopen = () => {
        
            setTimeout(() => {
                
                connect_side_sendMessage("peer joined sucessfuly:")
                
                setTimeout(()=>{
                    update_state(true)
                },1000)
            
            }, 1000);
            
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

export function connect_side_sendMessage(text) {
    datachannel.send(JSON.stringify(text));
}

let update_state = null
export function connect_state_update_con(fun){
update_state = fun
}