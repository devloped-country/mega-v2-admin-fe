import styles from "./SignupTitles.module.css";

function SignupTitles({ text }) {
  return <h2 className={styles.title}>{text}</h2>;
}

export default SignupTitles;
