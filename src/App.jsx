import { useState, useEffect } from 'react';
import Welcome_screen from './components/WelcomeScreen';
import ConnectPage from './components/ConnectPage';
import Chat from './components/ChatRoom'
import { handleCreate, hendelConnection, registerMessage } from './components/hooks/main';
import './App.css'

export default function App() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState('welcome');
  
  useEffect(()=>{
    registerMessage(setMessages);
  },[])

  return (
    <div className='app'>

      {currentPage === 'welcome' && (
        <Welcome_screen
          create={handleCreate}
          join={hendelConnection}
          connect={() => setCurrentPage('connect')}
          onReadDocs={() => {
            console.log("click")
            window.open('https://github.com/Tiyasbanerjee/One-To-One', '_blank' ,'noopener,noreferrer');
          }}
        />
      )}

      {currentPage === 'connect' && (
        <ConnectPage onBack={() => setCurrentPage('welcome')} onStartChat={()=>setCurrentPage('Chat')}/>
      )}

      {currentPage ==='Chat' && (
        <Chat 
        onBack={()=>setCurrentPage('connect')}
        message={messages}
        />
      )}
      
    </div>
  );
}