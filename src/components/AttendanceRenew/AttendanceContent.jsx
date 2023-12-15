import { useState } from 'react';
import styles from './AttendanceContent.module.css';
import PersonalSchedule from './PersonalSchedule';
import AttendanceStat from './AttendanceStat';

function AttendanceContent({ courseId }) {
  const [isViewStatus, setIsViewStatus] = useState(true);

  return (
    <section className={styles.wrapper}>
      <ul className={styles.menuList}>
        <li
          className={`${isViewStatus && styles.active} ${styles.menuItem}`}
          onClick={() => setIsViewStatus(true)}
        >
          개인 일정
        </li>
        <li
          className={`${!isViewStatus && styles.active} ${styles.menuItem}`}
          onClick={() => setIsViewStatus(false)}
        >
          통계
        </li>
      </ul>
      <div className={styles.viewWrapper}>
        {isViewStatus ? (
          <PersonalSchedule courseId={courseId} />
        ) : (
          <AttendanceStat courseId={courseId} />
        )}
      </div>
    </section>
  );
}

export default AttendanceContent;
