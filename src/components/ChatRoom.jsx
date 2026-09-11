import styles from './ChatRoom.module.css'
import Header from './Header.jsx';
import ChatBox from './ChatBox.jsx'

export default function ChatRoom({onBack}) {
  return (
    <div className={styles.contener}>
      <Header onBack={onBack}/>
      <div className={styles.chatBox}>
        
        <ChatBox/>

        <div className={styles.chatInput}>

            <textarea 
            rows={1}
            placeholder="Type Message"
            className={styles.inputFild}>

            </textarea>
            
            <button className={styles.send_btn}>Send</button>
        

        </div>

      </div>
    </div>
  );
}