import SignupTitles from '@/components/common/SignupTitles';
import SignupButton from '@components/common/SignupButton';
import styles from './First.module.css';
import { useSignup } from '@/hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function First() {
  const navigate = useNavigate();
  const { companyName, changeCompanyName } = useSignup();
  const [isButtonActive, setIsButtonAcitve] = useState(true);

  useEffect(() => {
    companyName.length ? setIsButtonAcitve(false) : setIsButtonAcitve(true);
  }, [companyName]);

  const handleClickNextButton = () => {
    if (!companyName.length) {
      return;
    }

    setIsButtonAcitve(false);
    navigate('/signup/2', { state: { companyName } });
  };

  const onMovePage = ({ code }) => {
    if (!isButtonActive && code === 'Enter') {
      handleClickNextButton();
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitles text='어떤 기관 또는 회사이신가요?' />
        <input
          type='text'
          placeholder='기관 또는 회사명을 입력해주세요'
          onChange={changeCompanyName}
          onKeyDown={onMovePage}
          className={styles.input}
          value={companyName}
        />
        <SignupButton
          text='다음'
          onClick={handleClickNextButton}
          isDisabled={isButtonActive}
        />
      </div>
    </section>
  );
}

export default First;
