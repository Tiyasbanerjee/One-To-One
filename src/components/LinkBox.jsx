import styles from './LinkBox.module.css'
import { useState } from 'react';

export default function LinkBox({onStartChat, mytoken, mode,load}){

    const [token,updateToken] = useState('');
    const [revealed, setRevealed] = useState(false);

    const handCopy = () => {
        navigator.clipboard.writeText(mytoken)
        setRevealed(true);
    };


    const buttonHandler = () => {
        onStartChat(token); 
    };

    const loadBtn = () => {
        load(token)
    };
    
    return(
        <div className={styles.box}>
            <div className={styles.input_box}>
                <div className={styles.token_name}>
                    <h2 className={styles.token_name_text}>Your Token:</h2>
                </div>
                <div className={styles.blur_helper}>
                    
               

                {
                    mode==="connect" && (
                        <div
                        className={styles.connection_token_hider} 
                        > 
                        
                        <h3>You are joining a Chat</h3>
                        <h5>paste your peer token and click load to get your token</h5>
                        <h6>Note that: token should start and end with '|'</h6>
                        
                        </div> 
                    )
                }

                {
                    mode==="create" && (
                <>
                    <textarea 
                    readOnly 
                    value={mytoken || ".....waiting....."} 
                    onClick={handCopy} 
                    className={`${styles.show_my_token} ${!revealed ? styles.blured : ''}`}>
                    </textarea>
                    
                    {!revealed && ( 
                    <div 
                    className={styles.my_token_wraper} 
                    onClick={handCopy}> 
                    <h3>Click to copy token</h3>
                    <p>Note: token should start and end with '|' </p>
                    </div> 
                    )}
                    
                </>
            )     
                }

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
                {
                    mode==="create" && (
                        <button className={styles.button} onClick={buttonHandler}>Confirm</button>
                    )
                }
                {
                    mode==="connect" && (
                        <button className={styles.button_load} onClick={loadBtn}>load</button>
                    )
                }
            </div>
        </div>
    );
}