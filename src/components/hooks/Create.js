

let peerConnection;
let notifyMessage;
let datachannel;

export async function createConnection(onmessage) {
    peerConnection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]});
    datachannel = peerConnection.createDataChannel('chat');
    
    notifyMessage = onmessage
    datachannel.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        const organized_msg = {type:"incomeing",text:msg}
        notifyMessage(organized_msg)    
    };
    datachannel.onopen = () => {
        setTimeout(() => {
            create_side_sendMessage("Creater is ready to chat:")
        }, 2000);
        
        setTimeout(()=>{
            update_state(true)
        },1000)
    }

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

export async function acceptAnswer(answer){
    await peerConnection.setRemoteDescription(answer)
} 


export function create_side_sendMessage(text) {
    datachannel.send(JSON.stringify(text));
}


let update_state = null
export function connect_state_update_cre(fun){
update_state = fun
}