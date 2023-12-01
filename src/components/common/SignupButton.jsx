import styles from './SignupButton.module.css';

function SignupButton({ onClick, text, type }) {
  if (type === 'secondary') {
    return (
      <button
        type='buttpon'
        onClick={onClick}
        className={`${styles.button} ${styles.secondaryButton}`}
      >
        {text}
      </button>
    );
  }

  return (
    <button type='buttpon' onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
}

export default SignupButton;
