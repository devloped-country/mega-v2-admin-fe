import { useEffect, useState } from 'react';
import AttendanceInfo from '@components/DashBoard/AttendanceInfo';
import styles from './DashBoardContent.module.css';
import EducationPersonnelInfo from '@components/DashBoard/EducationPersonnelInfo';
import { v4 as uuidv4 } from 'uuid';
import AttendanceStats from '@components/DashBoard/AttendanceStats';
import { useSocketSetup } from '@/hooks/useSocketSetup';

function DashBoardContent() {
  const { doSend } = useSocketSetup();

  useEffect(() => {
    const connectObject = {
      action: 'dashboard',
      myRole: 'manager',
      myId: 1,
    };
    doSend(connectObject);
  }, []);

  const [data, setData] = useState({
    entry: [
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '김유범',
        tel: '010-8634-1449',
        time: '08:48',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '박소희',
        tel: '010-0000-0000',
        time: '08:48',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '왕찬현',
        tel: '010-0000-0000',
        time: '08:48',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '전진우',
        tel: '010-0000-0000',
        time: '08:48',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '옥승철',
        tel: '010-0000-0000',
        time: '08:48',
      },
    ],
    notEntry: [
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '황정민',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '이한형',
        tel: '010-0000-0000',
      },
    ],
    earlyLeave: [
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '송정희',
        tel: '010-0000-0000',
      },
    ],
    absent: [
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '김경욱',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '박효관',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '곽다은',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '정민이',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '김동욱',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '김기찬',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '이수민',
        tel: '010-0000-0000',
      },
      {
        id: uuidv4(),
        img: `${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`,
        name: '류가희',
        tel: '010-0000-0000',
      },
    ],
  });

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <EducationPersonnelInfo title='전체 교육생' content='20명' />
        <EducationPersonnelInfo title='수료율' content='16명 / 80%' />
        <EducationPersonnelInfo title='퇴소율' content='4명 / 20%' />
      </header>
      <div className={styles.attendanceInfoWrapper}>
        <AttendanceInfo
          title='입실자'
          count={`${data.entry.length}명`}
          attendanceInfo={data.entry}
        />
        <AttendanceInfo
          title='미입실자'
          count={`${data.notEntry.length}명`}
          attendanceInfo={data.notEntry}
        />
        <AttendanceInfo
          title='조퇴예정자'
          count={`${data.earlyLeave.length}명`}
          attendanceInfo={data.earlyLeave}
        />
        <AttendanceInfo
          title='결석예정자'
          count={`${data.absent.length}명`}
          attendanceInfo={data.absent}
        />
      </div>
      <div className={styles.attendanceChartWrapper}>
        <AttendanceStats
          title='이번주 평균 출석자'
          labels={['12월 4일', '12월 5일', '12월 6일', '12월 7일', '12월 8일']}
          statsData={[1, 3, 5, 7, 2]}
        />
      </div>
      <div className={styles.attendanceChartWrapper}>
        <AttendanceStats
          title='이번주 평균 지각자'
          labels={['12월 4일', '12월 5일', '12월 6일', '12월 7일', '12월 8일']}
          statsData={[2, 1, 3, 5, 1]}
        />
      </div>
    </section>
  );
}

export default DashBoardContent;
