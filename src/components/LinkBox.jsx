import styles from './LinkBox.module.css'
import { useState } from 'react';

export default function LinkBox({onStartChat, myToken , peerToken}){

    const handCopy = () => {
        navigator.clipboard.writeText(myToken)
    }

    const takeCopy = () => {
        peerToken = navigator.clipboard.readText()
        
        peerToken=='none' && {}
    }

    const buttonHandeler = () => {
        onStartChat
        takeCopy
    }
    
    return(
        <div className={styles.box}>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2 className={styles.token_name_text}>Your Token:</h2>
                </div>
                <textarea 
                readOnly
                value={myToken || ".....waiting....."}
                onClick={handCopy}
                className={styles.show_my_token}>
                
                </textarea>
            </div>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2 className={styles.token_name_text}>Peer Token:</h2>
                </div>
                <textarea               
                onClick={takeCopy}
                placeholder="Paste your friend's token here"
                className={styles.take_token}>
                </textarea>
            </div>
            <div className={styles.button_holder}>
                <button className={styles.button} onClick={buttonHandeler}>Confirm</button>
            </div>
        </div>
    );
}