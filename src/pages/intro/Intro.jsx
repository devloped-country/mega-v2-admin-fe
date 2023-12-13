import { useNavigate } from 'react-router-dom';
import styles from './Intro.module.css';

function Intro() {
  const navigate = useNavigate();

  const handleClickStartButton = () => {
    navigate('/signup/1');
  };

  const handleClickLoginButton = () => {
    navigate('/login');
  };

  return (
    <section className={styles.wrapper}>
      <main className={styles.main}>
        <h2 className={styles.slogan}>새로운 출결관리의 시작, Mega</h2>
        <button
          type='button'
          className={styles.start}
          onClick={handleClickStartButton}
        >
          시작하기
        </button>
        <span className={styles.login} onClick={handleClickLoginButton}>
          로그인 하기
        </span>
      </main>
    </section>
  );
}

export default Intro;
