import { createConnection } from './Create.js';
import { connectConnection } from './Connect.js'

export const handleCreate = () => {
    createConnection( message_update );
};

export const hendelConnection = () => {
    connectConnection();
}

let messages
export const registerMessage = (setter) => {
    messages = setter;
};

export const message_update = (data) => {
    messages((pre) => [...pre, data]); 
};