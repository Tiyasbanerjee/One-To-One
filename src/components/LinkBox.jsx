import styles from './LinkBox.module.css'

export default function LinkBox({onStartChat}){




    
    return(
        <div className={styles.box}>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2 className={styles.token_name_text}>Your Token:</h2>
                </div>
                <textarea 
                readOnly
                className={styles.show_my_token}>
                
                </textarea>
            </div>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2 className={styles.token_name_text}>Peer Token:</h2>
                </div>
                <textarea               
                className={styles.take_token}>
                </textarea>
            </div>
            <div className={styles.button_holder}>
                <button className={styles.button} onClick={onStartChat}>Confirm</button>
            </div>
        </div>
    );
}