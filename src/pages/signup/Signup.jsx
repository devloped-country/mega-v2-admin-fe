import SignupTitle from '@/components/common/SIgnupTitle';
import SignupButton from '@components/common/SignupButton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import First from '@components/Signup/First';
import Second from '@components/Signup/Second';
import Third from '@components/Signup/Third';
import Fourth from '@components/Signup/Fourth';
import Fifth from '@components/Signup/Fifth ';
import styles from './Signup.module.css';
import Sixth from '../../components/Signup/Sixth';

function Signup() {
  const navigate = useNavigate();
  const { page } = useParams();
  const location = useLocation();

  if (parseInt(page) === 1) {
    return <First />;
  } else if (parseInt(page) === 2) {
    return <Second />;
  } else if (parseInt(page) === 3) {
    return <Third />;
  } else if (parseInt(page) === 4) {
    return <Fourth />;
  } else if (parseInt(page) === 5) {
    return <Fifth />;
  } else if (parseInt(page) === 6) {
    return <Sixth />;
  }

  const handleClickNextButton = () => {
    navigate('/intro');
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitle text={`${location.state.name}님 환영해요!`} />
        <img
          className={styles.img}
          src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/party_popper 1.svg`}
          alt='가입 환영'
        />
        <SignupButton text='확인' onClick={handleClickNextButton} />
      </div>
    </section>
  );
}

export default Signup;
