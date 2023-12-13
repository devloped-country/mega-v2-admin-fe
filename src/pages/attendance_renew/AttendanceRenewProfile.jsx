import { useNavigate } from 'react-router-dom';
import styles from './AttendanceRenewProfile.module.css';
import ModalButton from '@components/common/ModalButton';
import { useState } from 'react';
import Schedules from '@components/AttendanceRenew/Schedules';
import AttendanceInfo from '@/components/AttendanceRenew/AttendanceInfo';
import AttendancePersonal from '@/components/AttendanceRenew/AttendancePersonal';

function AttendanceRenewProfile() {
  const navigate = useNavigate();
  const [isViewStatus, setIsViewStatus] = useState('info');

  const handleClickCanceledButton = () => {
    navigate(-1);
  };

  return (
    <>
      <header className={styles.header}>
        <ModalButton
          type='canceled'
          text='나가기'
          onAction={handleClickCanceledButton}
        />
      </header>
      <div className={styles.hero}></div>
      <section className={styles.content}>
        <div className={styles.infoHeader}>
          <img
            className={styles.profile}
            src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/Frame 417.svg`}
          />
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>김유범</h3>
            <p className={styles.desc}>
              클라우드 네이티브 애플리케이션 개발자 양성 과정
            </p>
          </div>
        </div>
        <div className={styles.menuWrapper}>
          <ul className={styles.menuList}>
            <li
              className={`${styles.menuItem} ${
                isViewStatus === 'info' && styles.active
              }`}
              onClick={() => setIsViewStatus('info')}
            >
              정보
            </li>
            <li
              className={`${styles.menuItem} ${
                isViewStatus === 'attendance' && styles.active
              }`}
              onClick={() => setIsViewStatus('attendance')}
            >
              출결
            </li>
            <li
              className={`${styles.menuItem} ${
                isViewStatus === 'schedule' && styles.active
              }`}
              onClick={() => setIsViewStatus('schedule')}
            >
              일정
            </li>
          </ul>
          <div className={styles.contentWrapper}>
            {isViewStatus === 'info' && <AttendanceInfo />}
            {isViewStatus === 'attendance' && <AttendancePersonal />}
            {isViewStatus === 'schedule' && <Schedules />}
          </div>
        </div>
      </section>
    </>
  );
}

export default AttendanceRenewProfile;
