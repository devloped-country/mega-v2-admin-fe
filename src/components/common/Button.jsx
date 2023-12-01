import styles from './Button.module.css';

function Button({ text, img, onAction }) {
  return (
    <button type='button' onClick={onAction} className={styles.button}>
      {img && <img src={img} alt={text} className={styles.img} />}
      {text}
    </button>
  );
}

export default Button;
