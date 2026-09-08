import styles from './ConnectPage.module.css';
import Header from './Header.jsx';

export default function ConnectPage({onBack}){
  return (
    <div className={styles.container}>
      <Header/>
    </div>
  );
}