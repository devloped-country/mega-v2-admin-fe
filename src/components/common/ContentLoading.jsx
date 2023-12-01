import ClipLoader from 'react-spinners/ClipLoader';
import styles from './ContentLoading.module.css';

function ContentLoading() {
  return (
    <section className={styles.wrapper}>
      <ClipLoader />
    </section>
  );
}

export default ContentLoading;
