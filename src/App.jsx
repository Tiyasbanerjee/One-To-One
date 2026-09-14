import { useState, useEffect } from 'react';
import Welcome_screen from './components/WelcomeScreen';
import ConnectPage from './components/ConnectPage';
import Chat from './components/ChatRoom'
import { handleCreate, hendelConnection, registerMessage, setPeerToken } from './components/hooks/main';
import './App.css'

export default function App() {
  const [message, setMessages] = useState([]);
  const [myToken, setMyToken] = useState('');
  const [currentPage, setCurrentPage] = useState('welcome');

  const establishConnection = (peerToken) => {
    setCurrentPage('Chat')
    setPeerToken(peerToken)
  }

  const updateMytoken = async () => {
    const token = await handleCreate();
    setMyToken(token);
  }
  
  useEffect(()=>{
    registerMessage(setMessages);
  },[])

  return (
    <div className='app'>

      {currentPage === 'welcome' && (
        <Welcome_screen
          create={updateMytoken}
          join={hendelConnection}
          connect={() => setCurrentPage('connect')}
          onReadDocs={() => {
            window.open('https://github.com/Tiyasbanerjee/One-To-One', '_blank' ,'noopener,noreferrer');
          }}
        />
      )}

      {currentPage === 'connect' && (
        <ConnectPage onBack={() => setCurrentPage('welcome')} mytoken={myToken} onStartChat={(peerToken)=>establishConnection(peerToken)}/>
      )}

      {currentPage ==='Chat' && (
        <Chat 
        onBack={()=>setCurrentPage('connect')}
        message={message}
        />
      )}
      
    </div>
  );
}