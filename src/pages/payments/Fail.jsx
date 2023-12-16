import { useNavigate } from 'react-router-dom';
import styles from './Fail.module.css';

export function FailPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <img src={`https://d2f3kqq80r3o3g.cloudfront.net/reauth 1.svg`} />
        <h2 className={styles.title}>결제 실패</h2>
        <button
          className='button'
          style={{ marginTop: '30px', marginRight: '10px' }}
          onClick={() => navigate('/intro')}
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
