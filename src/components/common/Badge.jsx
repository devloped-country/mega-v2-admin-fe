import styles from './Badge.module.css';

function Badge({ type, text }) {
  if (type === 'blue') {
    return <div className={`${styles.wrapper} ${styles.blue}`}>{text}</div>;
  } else if (type === 'green') {
    return <div className={`${styles.wrapper} ${styles.green}`}>{text}</div>;
  }

  return <div className={`${styles.wrapper} ${styles.orange}`}>{text}</div>;
}

export default Badge;
