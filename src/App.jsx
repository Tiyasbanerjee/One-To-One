import { useState } from 'react';
import Welcome_screen from './components/WelcomeScreen';
import ConnectPage from './components/ConnectPage';
import Chat from './components/ChatRoom'

import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  return (
    <div className='app'>

      {currentPage === 'welcome' && (
        <Welcome_screen
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
        <Chat/>
      )}
      
    </div>
  );
}