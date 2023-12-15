import styles from './AttendanceStatBodyTd.module.css';

function AttendanceStatBodyTd({
  name,
  attendanceSum,
  attendanceResponse,
  profile,
}) {
  const mapedAttendanceResponse = attendanceResponse
    .sort((a, b) => new Date(a.attendanceDate) - new Date(b.attendanceDate))
    .map(({ statusDescription }, index) => {
      return (
        <td key={index} className={styles.td}>
          <div className={styles.tdInner}>{statusDescription}</div>
        </td>
      );
    });

  const mapedAttendanceSum = Object.values(attendanceSum).map(
    (value, index) => {
      return (
        <td key={index} className={styles.td}>
          <div className={styles.tdInner}>{value}</div>
        </td>
      );
    }
  );

  return (
    <tr className={styles.tr}>
      <td className={`${styles.name} ${styles.td}`}>
        <div className={styles.tdInner}>
          <img src={profile} alt='프로필' className={styles.profile} />
          {name}
        </div>
      </td>
      {mapedAttendanceResponse}
      {mapedAttendanceSum}
    </tr>
  );
}

export default AttendanceStatBodyTd;
