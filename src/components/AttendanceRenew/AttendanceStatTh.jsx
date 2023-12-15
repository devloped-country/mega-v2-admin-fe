import styles from './AttendanceStatTh.module.css';

function AttendanceStatTh({ date }) {
  const mapedDate = date
    .sort((a, b) => new Date(a.attendanceDate) - new Date(b.attendanceDate))
    .map(({ attendanceDate }, index) => {
      return (
        <th key={index} className={styles.th}>
          <div className={styles.thInner}>{`${attendanceDate.substring(
            5,
            7
          )}월 ${attendanceDate.substring(8, 11)}일`}</div>
        </th>
      );
    });

  return (
    <tr className={styles.tr}>
      <th className={`${styles.name} ${styles.th}`}>
        <div className={styles.thInner}>이름</div>
      </th>
      {mapedDate}
      <th className={styles.th}>
        <div className={styles.thInner}>출석</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>지각</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>조퇴</div>
      </th>
      <th className={styles.th}>
        <div className={styles.thInner}>결석</div>
      </th>
    </tr>
  );
}

export default AttendanceStatTh;
