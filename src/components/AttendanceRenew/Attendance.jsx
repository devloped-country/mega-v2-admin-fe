import styles from './Attendance.module.css';

function Attendance({ date, startTime, endTime, attendance }) {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{date}</td>
      <td className={styles.td}>{startTime}</td>
      <td className={styles.td}>{endTime}</td>
      <td className={styles.td}>{attendance}</td>
    </tr>
  );
}

export default Attendance;
