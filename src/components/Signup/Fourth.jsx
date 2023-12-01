import SignupTitle from '@components/common/SignupTitle';
import SignupButton from '@components/common/SignupButton';
import styles from './Fourth.module.css';

function Fourth({ onClickAuthButton }) {
  return (
    <section className={styles.wrapper}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <SignupTitle text='이메일 인증을 해주세요.' />
        <input type='text' className={styles.input} placeholder='이메일' />
        <div className={styles.addressWrapper}>
          <input
            type='text'
            className={styles.input}
            placeholder='인증번호'
            readOnly
          />
          <SignupButton text='인증' onClick={handleClickButton} />
        </div>
        <SignupButton text='다음' onClick={onAction} />
      </form>
    </section>
  );
}

export default Fourth;
