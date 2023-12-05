import SignupTitle from '@components/common/SignupTitle';
import SignupButton from '@components/common/SignupButton';
import styles from './Fifth.module.css';
import { useSignup } from '@/hooks/useSignup';
import { useLocation, useNavigate } from 'react-router-dom';

function Fifth() {
  const { email, authNumber, changeEmail, changeAuthNumber } = useSignup();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClickNextButton = () => {
    if (!email.length || !authNumber.length) {
      return;
    }

    navigate('/signup/6', {
      state: { email, authNumber, ...state },
    });
  };

  const onMovePage = ({ code }) => {
    if (code === 'Enter') {
      handleClickNextButton();
    }
  };

  const handleClickAuthButton = () => {};

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitle text='이메일 인증을 해주세요.' />
        <input
          type='text'
          className={styles.input}
          placeholder='이메일'
          value={email}
          onKeyDown={onMovePage}
          onChange={changeEmail}
        />
        <div className={styles.authWrapper}>
          <input
            type='text'
            className={styles.input}
            placeholder='인증번호'
            value={authNumber}
            onKeyDown={onMovePage}
            onChange={changeAuthNumber}
          />
          <SignupButton text='인증' onClick={handleClickAuthButton} />
        </div>
        <SignupButton text='다음' onClick={handleClickNextButton} />
      </div>
    </section>
  );
}

export default Fifth;
