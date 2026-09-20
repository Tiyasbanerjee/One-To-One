import styles from './ChatRoom.module.css'
import Header from './Header.jsx';
import ChatBox from './ChatBox.jsx'

import { useState } from 'react';

export default function ChatRoom({onBack, message, sendMessage,connectionState}) {

  const [my_message,updateMyMessage] = useState('');

  const SendMessage_handeler = () =>{
    if(my_message.trim()!=''){    
      sendMessage(my_message)
      }
    updateMyMessage('')
  }

  const handel_key_down = (e) =>{
    if(e.key==="Enter"){
      e.preventDefault();
      SendMessage_handeler();
    }
  }

  return (
    <>
    <div className={styles.contener}>
      <Header onBack={onBack}/>
      <div className={`${styles.chatBox} ${!connectionState? styles.chat_blur : ''}`}>
        
        <ChatBox message={message}/>

        <div className={styles.chatInput}>

            <textarea 
            rows={1}
            placeholder="Type Message"
            onChange={(e) => updateMyMessage(e.target.value)}
            onKeyDown={handel_key_down}
            value={my_message}
            className={styles.inputFild}>
            </textarea>
            
            <button 
            className={styles.send_btn}
            onClick={SendMessage_handeler}
            >Send</button>
        

        </div>

      </div>

    </div>
    {
      !connectionState && (
        <div className={styles.loading}>
          <div className={styles.load_icon_holder}>
          </div>
        </div>
      )
    }
    </>
  );
}