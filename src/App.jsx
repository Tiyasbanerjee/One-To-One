import { useState, useEffect } from 'react';
import Welcome_screen from './components/WelcomeScreen';
import ConnectPage from './components/ConnectPage';
import Chat from './components/ChatRoom'
import { hendel_loading,handleCreate, registerMessage, setPeerToken, sendMessage } from './components/hooks/main';
import './App.css'

export default function App() {
  const [message, setMessages] = useState([]);
  const [myToken, setMyToken] = useState('');
  const [currentPage, setCurrentPage] = useState('welcome');
  const [mode,updateMode] = useState("")
  const [connectionState,update_connectionState]  = useState(false);

  const establishConnection = (peerToken) => {
    setCurrentPage('Chat')
    if(mode==="create"){setPeerToken(peerToken)}
  }

  const hendelConnection = () => {
    updateMode('connect');
  }

  const updateMytoken = async () => {
    const token = await handleCreate();
    setMyToken(token);
    updateMode('create');
  }

  const load = async (peerToken) => {
    updateMode("connect_2")
    const a = await setPeerToken(peerToken)
    setMyToken(a)
  }
  
  useEffect(()=>{
    registerMessage(setMessages);
    hendel_loading(update_connectionState);
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
        <ConnectPage 
        onBack={() => setCurrentPage('welcome')} 
        mytoken={myToken} 
        onStartChat={(peerToken)=>establishConnection(peerToken)}
        load={load}
        mode={mode}
        />
      )}

      {currentPage ==='Chat' && (
        <Chat 
        onBack={()=>setCurrentPage('connect')}
        message={message}
        sendMessage={sendMessage}
        connectionState={connectionState}
        />
      )}
      
    </div>
  );
}