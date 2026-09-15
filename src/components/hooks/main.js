import { createConnection } from './Create.js';
import { connectConnection } from './Connect.js'

import LZString from 'lz-string';

export const handleCreate = async () => {
    const token = await createConnection( message_update );
    const compressed = LZString.compressToBase64(token);
    return `|${compressed}|`
};

export const hendelConnection = () => {
     
    return connectConnection(message_update);
    
}

let messages
export const registerMessage = (setter) => {
    messages = setter;
};

export const message_update = (data) => {
    messages((pre) => [...pre, data]); 
};

export const setPeerToken = (token) => {
    const compressed = token.slice(1,-1)
    const un_compressed = LZString.decompressFromBase64(compressed)
    const answer = JSON.parse(un_compressed)
    return 0
}