import styles from './ChatBox.module.css'

export default function ChatBox({message}){

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


        </div>
    )
}