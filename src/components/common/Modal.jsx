import styles from './Modal.module.css';

function Modal({ children, onClose }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.backdrop} onClick={onClose} />
      {children}
    </section>
  );
}

export default Modal;
