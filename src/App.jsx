import { useState } from 'react';
import Welcome_screen from './components/WelcomeScreen';
import ConnectPage from './components/ConnectPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  return (
    <>
      {currentPage === 'welcome' && (
        <Welcome_screen
          connect={() => setCurrentPage('connect')}
          onReadDocs={() => {
            console.log("click")
            window.open('https://github.com/Tiyasbanerjee/One-To-One', '_blank');
          }}
        />
      )}

      {currentPage === 'connect' && (
        <ConnectPage onBack={() => setCurrentPage('welcome')} />
      )}
    </>
  );
}