import axios from 'axios';
import SignupTitle from '@components/common/SignupTitle';
import SignupButton from '@components/common/SignupButton';
import styles from './Fifths.module.css';
import { useSignup } from '@/hooks/useSignup';
import { useMutation } from '@/hooks/useMutation';
import { useLocation, useNavigate } from 'react-router-dom';

function Fifths() {
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

  const { mutate } = useMutation(
    async (param) =>
      await axios({
        url: '/api/auth/identify',
        method: 'post',
        data: param,
      })
  );

  const { mutate: authMutate } = useMutation(
    async (param) =>
      await axios({
        url: '/api/auth/identify/certificate',
        method: 'post',
        data: param,
      })
  );

  const onMovePage = ({ code }) => {
    if (code === 'Enter') {
      handleClickNextButton();
    }
  };

  const handleClickSubmitButton = () => {
    if (!email) {
      return;
    }

    mutate({ email });
  };

  const handleClickAuthButton = () => {
    authMutate({
      email,
      authNumber,
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitle text='이메일 인증을 해주세요.' />
        <div className={styles.authWrapper}>
          <input
            type='text'
            className={styles.input}
            placeholder='이메일'
            value={email}
            onKeyDown={onMovePage}
            onChange={changeEmail}
          />
          <SignupButton text='전송' onClick={handleClickSubmitButton} />
        </div>
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

export default Fifths;
