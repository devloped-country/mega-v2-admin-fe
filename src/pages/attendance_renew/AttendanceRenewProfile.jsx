import { useNavigate, useParams } from 'react-router-dom';
import styles from './AttendanceRenewProfile.module.css';
import ModalButton from '@components/common/ModalButton';
import { useState } from 'react';
import Schedules from '@components/AttendanceRenew/Schedules';
import AttendanceInfo from '@/components/AttendanceRenew/AttendanceInfo';
import AttendancePersonal from '@/components/AttendanceRenew/AttendancePersonal';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

function AttendanceRenewProfile() {
  const navigate = useNavigate();
  const [isViewStatus, setIsViewStatus] = useState('info');
  const { id, courseId } = useParams();

  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: `/api/user/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  const handleClickCanceledButton = () => {
    navigate(-1);
  };

  if (isLoading) {
    return;
  }

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
            <h3 className={styles.title}>{data.data.data.name}</h3>
            <p className={styles.desc}>{data.data.data.course}</p>
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
            {isViewStatus === 'info' && <AttendanceInfo id={id} />}
            {isViewStatus === 'attendance' && <AttendancePersonal id={id} />}
            {isViewStatus === 'schedule' && <Schedules id={id} />}
          </div>
        </div>
      </section>
    </>
  );
}

export default AttendanceRenewProfile;
