import styles from './ModalButton.module.css';

function ModalButton({ type, onAction, text }) {
  if (type === 'mutated') {
    return (
      <button
        type='button'
        className={`${styles.button} ${styles.mutated}`}
        onClick={onAction}
      >
        {text}
      </button>
    );
  } else if (type === 'confirmed') {
    return (
      <button
        type='button'
        className={`${styles.button} ${styles.confirmed}`}
        onClick={onAction}
      >
        {text}
      </button>
    );
  }

  return (
    <button type='button' className={styles.button} onClick={onAction}>
      {text}
    </button>
  );
}

export default ModalButton;
