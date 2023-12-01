import SignupTitle from '@/components/common/SIgnupTitle';
import SignupButton from '@components/common/SignupButton';
import styles from './Fifth.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '@/hooks/useSignup';
import { useState } from 'react';

function Fifth() {
  const { password, changePassword, reset } = useSignup();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleChangePasswordConfirm = ({ target }) => {
    setPasswordConfirm(target.value);
  };

  const handleClickNextButton = () => {
    if (
      !password.length ||
      !passwordConfirm.length ||
      password !== passwordConfirm
    ) {
      return;
    }

    reset();
    navigate('/signup/6');
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitle text='비밀번호를 입력해주세요.' />
        <input
          type='password'
          placeholder='비밀번호'
          onChange={changePassword}
          className={styles.input}
          value={password}
        />
        <input
          type='password'
          placeholder='비밀번호 확인'
          onChange={handleChangePasswordConfirm}
          className={styles.input}
          value={passwordConfirm}
        />
        <SignupButton text='다음' onClick={handleClickNextButton} />
      </div>
    </section>
  );
}

export default Fifth;
