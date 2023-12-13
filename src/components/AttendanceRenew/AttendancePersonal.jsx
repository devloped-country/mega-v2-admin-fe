import Attendance from '@components/AttendanceRenew/Attendance';
import styles from './AttendancePersonal.module.css';

function AttendancePersonal() {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>날짜</th>
          <th className={styles.th}>입실 시간</th>
          <th className={styles.th}>퇴실 시간</th>
          <th className={styles.th}>출결</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        <Attendance
          date='10월 17일 (화)'
          startTime='9:00'
          endTime='16:50'
          attendance='출석'
        />
        <Attendance
          date='10월 17일 (화)'
          startTime='9:00'
          endTime='16:50'
          attendance='출석'
        />
        <Attendance
          date='10월 17일 (화)'
          startTime='9:00'
          endTime='16:50'
          attendance='출석'
        />
        <Attendance
          date='10월 17일 (화)'
          startTime='9:00'
          endTime='16:50'
          attendance='출석'
        />
        <Attendance
          date='10월 17일 (화)'
          startTime='9:00'
          endTime='16:50'
          attendance='출석'
        />
        <Attendance
          date='10월 17일 (화)'
          startTime='9:00'
          endTime='16:50'
          attendance='출석'
        />
      </tbody>
    </table>
  );
}

export default AttendancePersonal;
