import styles from './WelcomeScreen.module.css';

export default function WelcomeScreen({ connect, onReadDocs }){
  return (
    <div className={styles.container}>
      <div className={styles.options_holder}>
          <div className={styles.notes}>
            
            <h5 style={{color: '#478aff'}}>Meet your personal Waki-Talki</h5>
            
            <h2 style={{color: '#7d63f3',marginBottom:'1cqh'}}><i><b>One-To-One</b></i></h2>
            
            <img src="/AppIcon.svg" className={styles.icon}></img>

            <h5 style={{color:'#415168'}}>
              This app provides you a medium to connect with your friends, or people you trust
              without relying on external servers.
              <br/>
              Means there is no probability that your data would be stored
              in some corner of the internet.
            </h5>
            
            <h4 style={{color:'#155cc1',marginBottom:'1cqh',marginTop:'1cqh'}}>Usage Guide</h4>
            
            <h5 style={{color:'#4b596a'}}>
              1. You can create a chat or join a chat
              <br/>
              2. you can see a text, copy and send this to 
              the trusted one you want to talk to.
              <br/>
              3. Now they will send his handshake key. you need to paste his key to initiate the handshake.
              <br/>
              4. And they also have to do the same process , paste your handshake key.
            </h5>
          
          </div>
          
          <div className={styles.action_keys}>
            
            <button className={styles.make_chat} onClick={connect}><b>-Create-</b></button>
            <button className={styles.make_chat} onClick={connect}><b>-Join-</b></button>
            <button className={styles.make_chat} onClick={onReadDocs}><b>..Read..Dcos..</b></button>
          
          </div>
          
      </div>
    </div>
  );
}