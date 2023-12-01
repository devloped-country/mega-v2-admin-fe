import styles from './AttendanceStatTh.module.css';

function AttendanceStatTh() {
  return (
    <tr className={styles.tr}>
      <th className={`${styles.name} ${styles.th}`}>
        <div className={styles.thInner}>이름</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/16 월</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/17 화</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/18 수</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/19 목</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/20 금</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/23 월</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/24 화</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/25 수</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/26 목</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/27 금</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/30 월</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>10/31 화</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>11/01 수</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>11/02 목</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>11/03 금</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>11/06 월</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>11/07 화</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>11/08 수</div>
      </th>
    </tr>
  );
}

export default AttendanceStatTh;
