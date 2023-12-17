import { useNavigate } from 'react-router-dom';
import styles from './Payment.module.css';

function Payment() {
  const navigate = useNavigate();

  const onButtonClick = (value, month) => {
    navigate('/detailPayment', { state: { amount: value, month } });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.panel}>
          <h3 className={styles.title}>3개월</h3>
          <p className={styles.price}>{Number(600000).toLocaleString()}원</p>
          <ul className={styles.funcList}>
            <li className={styles.funcItem}>공지사항 기능</li>
            <li className={styles.funcItem}>커리큘럼 기능</li>
            <li className={`${styles.funcItem} ${styles.cancel}`}>
              출결관리 기능
            </li>
            <li className={`${styles.funcItem} ${styles.cancel}`}>쪽지 기능</li>
            <li className={`${styles.funcItem} ${styles.cancel}`}>
              위치기반 QR 인증 기능
            </li>
          </ul>
          <button
            className={styles.button}
            onClick={() => onButtonClick(600000, 3)}
          >
            시작하기
          </button>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.title}>6개월</h3>
          <p className={styles.price}>{Number(1000000).toLocaleString()}원</p>
          <ul className={styles.funcList}>
            <li className={styles.funcItem}>공지사항 기능</li>
            <li className={styles.funcItem}>커리큘럼 기능</li>
            <li className={styles.funcItem}>출결관리 기능</li>
            <li className={`${styles.funcItem} ${styles.cancel}`}>쪽지 기능</li>
            <li className={`${styles.funcItem} ${styles.cancel}`}>
              위치기반 QR 인증 기능
            </li>
          </ul>
          <button
            className={styles.button}
            onClick={() => onButtonClick(1000000, 6)}
          >
            시작하기
          </button>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.title}>12개월</h3>
          <p className={styles.price}>{Number(1800000).toLocaleString()}원</p>
          <ul className={styles.funcList}>
            <li className={styles.funcItem}>공지사항 기능</li>
            <li className={styles.funcItem}>커리큘럼 기능</li>
            <li className={styles.funcItem}>출결관리 기능</li>
            <li className={styles.funcItem}>쪽지 기능</li>
            <li className={styles.funcItem}>위치기반 QR 인증 기능</li>
          </ul>
          <button
            className={styles.button}
            onClick={() => onButtonClick(1800000, 12)}
          >
            시작하기
          </button>
        </div>
      </div>
    </section>
  );
}

export default Payment;
