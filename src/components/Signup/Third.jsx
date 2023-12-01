import SignupTitle from '@components/common/SignupTitle';
import SignupButton from '@components/common/SignupButton';
import styles from './Third.module.css';
import { useDaumPostcodePopup } from 'react-daum-postcode';

function Third({
  address,
  adminName,
  phoneNumber,
  onComplete,
  onChangeAdminName,
  onChangeAmdinPhoneNumber,
  onAction,
}) {
  const open = useDaumPostcodePopup(
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );

  const handleClickButton = () => {
    open({ onComplete });
  };

  return (
    <section className={styles.wrapper}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <SignupTitle text='관리자님의 개인정보를 입력해주세요.' />
        <input
          type='text'
          className={styles.input}
          placeholder='이름'
          value={adminName}
          onChange={onChangeAdminName}
        />
        <input
          type='text'
          className={styles.input}
          placeholder='휴대폰 번호'
          value={phoneNumber}
          onChange={onChangeAmdinPhoneNumber}
        />
        <div className={styles.addressWrapper}>
          <input
            type='text'
            className={styles.input}
            placeholder='주소'
            value={address}
            readOnly
          />
          <SignupButton text='찾기' onClick={handleClickButton} />
        </div>
        <SignupButton text='다음' onClick={onAction} />
      </form>
    </section>
  );
}

export default Third;
