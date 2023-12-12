import styles from './AttendanceInfo.module.css';

function AttendanceInfo({ title, count, attendanceInfo }) {
  const mapedAttendanceInfo = attendanceInfo.map((info, index) => (
    <li key={index} className={styles.attendanceInfoItem}>
      <div className={styles.profile}>
        <img
          src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`}
          alt='프로필 사진'
          className={styles.profileImg}
        />
        <h4 className={styles.name}>{info.userName}</h4>
      </div>
      <ul className={styles.profileDescList}>
        <li className={styles.tel}>{`${String(info.userPhone).substring(
          0,
          3
        )}-${String(info.userPhone).substring(3, 7)}-${String(
          info.userPhone
        ).substring(7, 12)}`}</li>
        <li className={styles.time}>{info.startTime}</li>
      </ul>
    </li>
  ));

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.count}>{count}</div>
      </header>
      <ul className={styles.attendanceInfoList}>{mapedAttendanceInfo}</ul>
    </div>
  );
}

export default AttendanceInfo;
