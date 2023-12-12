import SignupTitles from '@components/common/SignupTitles';
import LocationMap from '@components/Setting/LocationMap';
import PostCode from '@components/Signup/PostCode';
import { useSignup } from '@/hooks/useSignup';
import styles from './Fourth.module.css';
import SignupButton from '@components/common/SignupButton';
import { useLocation, useNavigate } from 'react-router-dom';

function Fourth() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    address,
    detailAddress,
    latitude,
    longitude,
    changeDetailAddress,
    changeLatitude,
    changeLongitude,
  } = useSignup();

  const handleClickNextButton = () => {
    if (!address.length || !detailAddress.length) {
      return;
    }

    navigate('/signup/5', {
      state: { address, detailAddress, ...state },
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
        <SignupTitles text='주소를 입력해주세요.' />
        <PostCode
          changeLatitude={changeLatitude}
          changeLongitude={changeLongitude}
        />
        <input
          type='text'
          className={styles.input}
          placeholder='상세 주소'
          value={detailAddress}
          onKeyDown={onMovePage}
          onChange={changeDetailAddress}
        />
        <LocationMap lat={latitude} lng={longitude} />
        <SignupButton text='다음' onClick={handleClickNextButton} />
      </div>
    </section>
  );
}

export default Fourth;
