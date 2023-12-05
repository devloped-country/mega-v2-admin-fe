import { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useMutation } from '@/hooks/useMutation';
import { useReducer } from 'react';
import { initialAuthState, authReducer } from '@/reducer/authReducer';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isShowingValidateMessage, setIsShowingValidateMessage] =
    useState(false);
  const [auth, dispatch] = useReducer(authReducer, initialAuthState);

  const { mutate } = useMutation(
    async (param) =>
      await axios(
        { url: '/api/auth/login', method: 'post', data: param },
        {
          onSuccess: (data) => {
            navigate('/');
          },
          onError: () => {
            setIsShowingValidateMessage(true);
          },
        }
      )
  );

  const onLogin = () => {
    const { email, password } = auth;

    mutate({
      email,
      password,
    });
  };

  const onEmailInput = ({ target }) =>
    dispatch({ type: 'EMAIL_INPUT', payload: target.value });

  const onPasswordInput = ({ target }) =>
    dispatch({ type: 'PASSWORD_INPUT', payload: target.value });

  return (
    <section className={styles.wrapper}>
      <main className={styles.main}>
        <h2 className={styles.title}>
          새로운 LMS의 시작 <strong className={styles.strong}>Mega</strong>
        </h2>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            className={styles.input}
            placeholder='이메일'
            onChange={onEmailInput}
            value={auth.email}
          />
          <input
            type='password'
            className={styles.input}
            placeholder='비밀번호'
            onChange={onPasswordInput}
            value={auth.password}
          />
          {isShowingValidateMessage && (
            <span className={styles.validateMessage}>
              아이디 또는 비밀번호가 틀렸어요
            </span>
          )}
          <button type='submit' className={styles.login} onClick={onLogin}>
            로그인
          </button>
        </form>
      </main>
    </section>
  );
}

export default Login;
