import { useState } from 'react';
import styles from './Login.module.css';

function Login() {
  const [isShowingValidateMessage, setIsShowingValidateMessage] =
    useState(false);

  return (
    <section className={styles.wrapper}>
      <main className={styles.main}>
        <h2 className={styles.title}>
          새로운 LMS의 시작 <strong className={styles.strong}>Mega</strong>
        </h2>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input type='text' className={styles.input} placeholder='이메일' />
          <input
            type='password'
            className={styles.input}
            placeholder='비밀번호'
          />
          {isShowingValidateMessage && (
            <span className={styles.validateMessage}>
              아이디 또는 비밀번호가 틀렸어요
            </span>
          )}
          <button type='submit' className={styles.login}>
            로그인
          </button>
        </form>
      </main>
    </section>
  );
}

export default Login;
