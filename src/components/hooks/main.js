import { createConnection, acceptAnswer , create_side_sendMessage} from './Create.js';
import { connectConnection, acceptOffer, connect_side_sendMessage } from './Connect.js'

import LZString from 'lz-string';

let mode = 'connect'

export const handleCreate = async () => {
    mode = "create"
    const token = await createConnection( message_update );
    const compressed = LZString.compressToBase64(token);
    return `|${compressed}|`
};

const hendelConnection = async (offer) => {

    await connectConnection(message_update);
    const token = await acceptOffer(offer)

    const compressed = LZString.compressToBase64(token);
    return `|${compressed}|`
}

let messages
export const registerMessage = (setter) => {
    messages = setter;
};

export const message_update = (data) => {
    messages((pre) => [...pre, data]); 
};

export const setPeerToken = async (token) => {
    const compressed = token.slice(1,-1)
    const un_compressed = LZString.decompressFromBase64(compressed)
    const answer = JSON.parse(un_compressed)

    console.log(answer)
    
    if(mode==='create'){
        await acceptAnswer(answer)
    }else{
        return hendelConnection(answer)
    }
}


export const sendMessage = (message) => {
    if (mode === 'create') {
        create_side_sendMessage(message);
    } else {
        connect_side_sendMessage(message);
    }
    message_update({ type: 'outgoing', text: message });
};
