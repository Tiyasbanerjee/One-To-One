import { createConnection } from './Create.js';
import { connectConnection } from './Connect.js'

export const handleCreate = () => {
    return createConnection( message_update );
    
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
    return 0
}