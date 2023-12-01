import { useNavigate } from 'react-router-dom';
import styles from './AttendanceRenewProfile.module.css';
import ModalButton from '@components/common/ModalButton';
import { useState } from 'react';
import Info from '@components/AttendanceRenew/Info';
import Attendance from '@components/AttendanceRenew/Attendance';
import Schedules from '@components/AttendanceRenew/Schedules';

function AttendanceRenewProfile() {
  const navigate = useNavigate();
  const [isViewStatus, setIsViewStatus] = useState('info');

  const handleClickCanceledButton = () => {
    navigate('/attendance');
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
            {isViewStatus === 'info' && (
              <>
                <Info term='이름' definition='김유범' />
                <Info term='생년월일' definition='123456' />
                <Info term='이메일' definition='kub1234@naver.com' />
                <Info term='전화번호' definition='010-1234-5678' />
                <Info term='주소' definition='대연역 2번 출구' />
                <Info term='계좌번호' definition='123456-12-123456' />
                <Info term='은행' definition='국민은행' />
              </>
            )}
            {isViewStatus === 'attendance' && (
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
            )}
            {isViewStatus === 'schedule' && <Schedules />}
          </div>
        </div>
      </section>
    </>
  );
}

export default AttendanceRenewProfile;
