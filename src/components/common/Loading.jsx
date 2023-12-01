import styles from './Loading.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

function Loading() {
  return (
    <section className={styles.wrapper}>
      <ClipLoader />
    </section>
  );
}

export default Loading;
