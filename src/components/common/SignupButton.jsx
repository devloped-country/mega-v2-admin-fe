import styles from './SignupButton.module.css';

function SignupButton({ onClick, text, type, isDisabled }) {
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
    <button
      type='buttpon'
      onClick={onClick}
      className={styles.button}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default SignupButton;
