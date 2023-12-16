import axios from 'axios';
import SignupTitles from '@components/common/SignupTitles';
import SignupButton from '@components/common/SignupButton';
import styles from './Fifths.module.css';
import { useSignup } from '@/hooks/useSignup';
import { useMutation } from '@/hooks/useMutation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Fifths() {
  const { email, authNumber, changeEmail, changeAuthNumber } = useSignup();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { state } = useLocation();
  const [isSubmitActive, setIsSubmitActive] = useState(true);
  const [isAuthActive, setIsAuthActive] = useState(true);

  useEffect(() => {
    email.length ? setIsSubmitActive(false) : setIsSubmitActive(true);
  }, [email]);

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
        url: 'https://user.mzc-appmega.click/api/auth/identify',
        method: 'post',
        data: param,
      }),
    {
      onSuccess: () => {
        setIsSubmitActive(true);
        setTimeout(() => {
          setIsSubmitActive(false);
        }, 60000);

        setIsAuthActive(false);
      },
    }
  );

  const { mutate: authMutate } = useMutation(
    async (param) =>
      await axios({
        url: 'https://user.mzc-appmega.click/api/auth/identify/certificate',
        method: 'post',
        data: param,
      }),
    {
      onSuccess: () => {
        setIsDisabled(false);
      },
    }
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
      certificationNumber: parseInt(authNumber),
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitles text='이메일 인증을 해주세요.' />
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
