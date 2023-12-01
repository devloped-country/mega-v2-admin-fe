import styles from './SignupTitle.module.css';

function SignupTitle({ text }) {
  return <h2 className={styles.title}>{text}</h2>;
}

export default SignupTitle;
