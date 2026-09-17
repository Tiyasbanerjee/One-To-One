import styles from './ChatBox.module.css'

import { useRef, useEffect } from 'react';

export default function ChatBox({message}){

    const messageEndRef = useRef(null);

    useEffect(
        ()=>{

            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        },[message]
    );

    return(
        <div className={styles.chatbox}>
            {
                message.map((msg)=>(
                    <div className={msg.type ==="outgoing" ? styles.messages_out : styles.messages_in}>
                        <div className={msg.type === "outgoing" ? styles.outgoing : styles.incomeing}>
                            {msg.text}
                        </div>
                    </div>
                ))
            }

            <div ref={messageEndRef} />
        </div>
    )
}