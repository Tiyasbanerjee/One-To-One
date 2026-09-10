import styles from './LinkBox.module.css'

export default function LinkBox(){
    return(
        <div className={styles.box}>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2>Your Token</h2>
                </div>
                <textarea className={styles.show_token}>

                </textarea>
            </div>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2>Peer Token</h2>
                </div>
                <textarea className={styles.show_token}>

                </textarea>
            </div>
            <div className={styles.button_holder}>
                <button className={styles.button}>Confirm</button>
            </div>
        </div>
    );
}