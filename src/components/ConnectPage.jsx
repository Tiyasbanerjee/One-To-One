import styles from './ConnectPage.module.css';
import Header from './Header.jsx';
import LinkBox from './LinkBox.jsx'

export default function ConnectPage({onBack}){
  return (
    <div className={styles.container}>
      <Header onBack={onBack}/>
      <div className={styles.LinkBox_holder}>
        <LinkBox/>
      </div>
    </div>
  );
}