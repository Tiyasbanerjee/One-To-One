import styles from './LinkBox.module.css'
import { useState } from 'react';

export default function LinkBox({onStartChat, mytoken}){

    const [token,updateToken] = useState('')
    const [revealed, setRevealed] = useState(false);

    const handCopy = () => {
        navigator.clipboard.writeText(mytoken)
        setRevealed(true);
    }


    const buttonHandler = () => {
        onStartChat(token); 
    };

    
    return(
        <div className={styles.box}>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2 className={styles.token_name_text}>Your Token:</h2>
                </div>
                <div className={styles.blur_helper}>
                    
               <textarea 
               readOnly 
               value={mytoken || ".....waiting....."} 
               onClick={handCopy} 
               className={`${styles.show_my_token} ${!revealed ? styles.blured : ''}`}>
               </textarea>

               {!revealed && 
               ( 
               <div 
               className={styles.my_token_wraper} 
               onClick={handCopy}> 
               <h3>Click to copy token</h3>
               <p>Note: token should start and end with '|' </p>
               </div> 
                )}

                </div>
            </div>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2 className={styles.token_name_text}>Peer Token:</h2>
                </div>
                <textarea               
                onChange={(e)=> updateToken(e.target.value)}
                placeholder="Paste your friend's token here"
                className={styles.take_token}>
                </textarea>
            </div>
            <div className={styles.button_holder}>
                <button className={styles.button} onClick={buttonHandler}>Confirm</button>
            </div>
        </div>
    );
}