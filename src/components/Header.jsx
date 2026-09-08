import styles from './Header.module.css';
import arrowUrl from '../assets/arrow-left.svg'; 

export default function Header({ onBack }) {
  return (
    <div className={styles.header}>

        <div className={styles.back_holder}>

            <button className={styles.back_btn} onClick={onBack}>
                <img src={arrowUrl} alt="Back" className={styles.arrow} />
            </button>

        </div>

    </div>
  );
}