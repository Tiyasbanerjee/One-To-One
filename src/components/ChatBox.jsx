import styles from './ChatBox.module.css'

export default function ChatBox({message}){

    return(
        <div className={styles.chatbox}>
            
            <div className={styles.messages_in}>
                <div className={styles.incomeing}>Hey Hiii</div>
            </div>

            <div className={styles.messages_out}>
                <div className={styles.outgoing}>Hey</div>
            </div>

            <div className={styles.messages_out}>
                <div className={styles.outgoing}>Hiiii There</div>
            </div>


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