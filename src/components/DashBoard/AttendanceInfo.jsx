import styles from './AttendanceInfo.module.css';

function AttendanceInfo({ title, count, attendanceInfo }) {
  const mapedAttendanceInfo = attendanceInfo.map((info) => (
    <li key={info.id} className={styles.attendanceInfoItem}>
      <div className={styles.profile}>
        <img src={info.img} alt='프로필 사진' className={styles.profileImg} />
        <h4 className={styles.name}>{info.name}</h4>
      </div>
      <ul className={styles.profileDescList}>
        <li className={styles.tel}>{info.tel}</li>
        <li className={styles.time}>{info.time}</li>
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
