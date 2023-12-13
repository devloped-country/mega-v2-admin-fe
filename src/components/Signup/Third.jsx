import SignupTitles from '@components/common/SignupTitles';
import SignupButton from '@components/common/SignupButton';
import styles from './Third.module.css';
import { useSignup } from '@/hooks/useSignup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Third() {
  const { adminName, phoneNumber, changeAdminName, changePhoneNumber } =
    useSignup();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isActiveButton, setIsActiveButton] = useState(true);

  useEffect(() => {
    setIsActiveButton(!adminName.length || !phoneNumber.length);
  }, [adminName, phoneNumber]);

  const handleClickNextButton = () => {
    if (!adminName.length || !phoneNumber.length) {
      return;
    }

    navigate('/signup/4', {
      state: { adminName, phoneNumber, ...state },
    });
  };

  const onMovePage = ({ code }) => {
    if (code === 'Enter') {
      handleClickNextButton();
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitles text='관리자님의 개인정보를 입력해주세요.' />
        <input
          type='text'
          className={styles.input}
          placeholder='이름'
          value={adminName}
          onKeyDown={onMovePage}
          onChange={changeAdminName}
        />
        <input
          type='text'
          className={styles.input}
          placeholder='휴대폰 번호'
          value={phoneNumber}
          onKeyDown={onMovePage}
          onChange={changePhoneNumber}
        />
        <SignupButton
          text='다음'
          onClick={handleClickNextButton}
          isDisabled={isActiveButton}
        />
      </div>
    </section>
  );
}

export default Third;
