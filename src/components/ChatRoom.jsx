import styles from './ChatRoom.module.css'
import Header from './Header.jsx';
import ChatBox from './ChatBox.jsx'

import { useState } from 'react';

export default function ChatRoom({onBack, message, sendMessage}) {

  const [my_message,updateMyMessage] = useState('');


  return (
    <div className={styles.contener}>
      <Header onBack={onBack}/>
      <div className={styles.chatBox}>
        
        <ChatBox message={message}/>

        <div className={styles.chatInput}>

            <textarea 
            rows={1}
            placeholder="Type Message"
            onChange={(e) => updateMyMessage(e.target.value)}
            className={styles.inputFild}>
            </textarea>
            
            <button 
            className={styles.send_btn}
            onClick={()=>sendMessage(my_message)}
            >Send</button>
        

        </div>

      </div>
    </div>
  );
}