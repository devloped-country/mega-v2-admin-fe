import SignupTitle from '@components/common/SignupTitle';
import SignupButton from '@components/common/SignupButton';
import styles from './Third.module.css';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useSignup } from '@/hooks/useSignup';
import { useLocation, useNavigate } from 'react-router-dom';

function Third() {
  const {
    address,
    adminName,
    phoneNumber,
    detailAddress,
    changeAddress,
    changeAdminName,
    changePhoneNumber,
    changeDetailAddress,
  } = useSignup();
  const navigate = useNavigate();
  const { state } = useLocation();

  const open = useDaumPostcodePopup(
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );

  const handleClickSearchButton = () => {
    open({ onComplete: changeAddress });
  };

  const handleClickNextButton = () => {
    if (
      !address.length ||
      !adminName.length ||
      !phoneNumber.length ||
      !detailAddress.length
    ) {
      return;
    }

    navigate('/signup/4', {
      state: { address, adminName, phoneNumber, detailAddress, ...state },
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitle text='관리자님의 개인정보를 입력해주세요.' />
        <input
          type='text'
          className={styles.input}
          placeholder='이름'
          value={adminName}
          onChange={changeAdminName}
        />
        <input
          type='text'
          className={styles.input}
          placeholder='휴대폰 번호'
          value={phoneNumber}
          onChange={changePhoneNumber}
        />
        <div className={styles.addressWrapper}>
          <input
            type='text'
            className={styles.input}
            placeholder='주소'
            value={address}
            readOnly
          />
          <SignupButton text='찾기' onClick={handleClickSearchButton} />
        </div>
        <input
          type='text'
          className={styles.input}
          placeholder='상세 주소  '
          value={detailAddress}
          onChange={changeDetailAddress}
        />
        <SignupButton text='다음' onClick={handleClickNextButton} />
      </div>
    </section>
  );
}

export default Third;
