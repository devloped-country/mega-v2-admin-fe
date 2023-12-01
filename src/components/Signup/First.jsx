import SignupTitle from '@/components/common/SIgnupTitle';
import SignupButton from '@components/common/SignupButton';
import styles from './First.module.css';
import { useSignup } from '@/hooks/useSignup';
import { useNavigate } from 'react-router-dom';

function First() {
  const navigate = useNavigate();
  const { companyName, changeCompanyName } = useSignup();

  const handleClickNextButton = () => {
    navigate('/signup/2', { state: { companyName } });
  };

  return (
    <section className={styles.wrapper}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <SignupTitle text='어떤 기관 또는 회사이신가요?' />
        <input
          type='text'
          placeholder='기관 또는 회사명을 입력해주세요'
          onChange={changeCompanyName}
          className={styles.input}
          value={companyName}
        />
        <SignupButton text='다음' onClick={handleClickNextButton} />
      </form>
    </section>
  );
}

export default First;
