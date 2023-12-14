import AttendanceInfo from '@components/DashBoard/AttendanceInfo';
import styles from './DashBoardContent.module.css';
import EducationPersonnelInfo from '@components/DashBoard/EducationPersonnelInfo';
import AttendanceStats from '@components/DashBoard/AttendanceStats';
import axios from 'axios';
import { useFetchs } from '@/hooks/useFetchs';
import ContentLoading from '@components/common/ContentLoading';

const getWeekdaysDates = () => {
  const currentDate = new Date();
  const weekdaysDates = [];

  for (let i = 1; i <= 5; i++) {
    const dayOfWeek = currentDate.getDay();
    const daysToAdd = i - dayOfWeek + (dayOfWeek === 0 ? 1 : 0);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysToAdd);

    const month = String(nextDate.getMonth() + 1).padStart(2, '0');
    const day = String(nextDate.getDate()).padStart(2, '0');
    const formattedDate = `${month}월 ${day}일`;

    weekdaysDates.push(formattedDate);
  }

  return weekdaysDates;
};

function DashBoardContent({ courseId }) {
  const { data: dashboard, isLoading } = useFetchs(
    [courseId],
    [
      {
        url: `/api/dashboard/${courseId}/status`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      {
        url: `/api/dashboard/${courseId}/attendance`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      {
        url: `/api/dashboard/${courseId}/late`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    ]
  );

  console.log(dashboard);

  // const { data: dashboard, isLoading } = useFetch(
  //   [courseId],
  //   async () =>
  //     await axios({
  //       url: `/api/dashboard/${courseId}/status`,
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  // );
  // const { data: attendance, isAttendanceLoading } = useFetch(
  //   [],
  //   async () =>
  //     await axios({
  //       url: `/api/dashboard/${courseId}/attendance`,
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  // );
  // const { data: late, isLateLoading } = useFetch(
  //   [],
  //   async () =>
  //     await axios({
  //       url: `/api/dashboard/${courseId}/late`,
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  // );

  if (isLoading) {
    return <ContentLoading />;
  }

  console.log(dashboard);

  const filteredNotCheckin = dashboard[0].filter(
    (info) => info.attendanceStatus === 0
  );

  const filteredCheckin = dashboard[0].filter(
    (info) => info.attendanceStatus === 2 || info.attendanceStatus === 1
  );

  const weekdaysDates = getWeekdaysDates();

  const mapedAttendance = dashboard[1].map(({ count }) => count);

  const mapedLate = dashboard[2].map(({ count }) => count);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <EducationPersonnelInfo
          title='전체 교육생'
          content={`${dashboard[0].length}명`}
        />
        <EducationPersonnelInfo
          title='입실율'
          content={`${filteredCheckin.length}명 / ${(
            (filteredCheckin.length / dashboard[0].length) *
            100
          ).toFixed(1)}%`}
        />
        <EducationPersonnelInfo
          title='미입실율'
          content={`${filteredNotCheckin.length}명 / ${(
            (filteredNotCheckin.length / dashboard[0].length) *
            100
          ).toFixed(1)}%`}
        />
      </header>
      <div className={styles.attendanceInfoWrapper}>
        <AttendanceInfo
          title='입실자'
          count={`${filteredCheckin.length}명`}
          attendanceInfo={filteredCheckin}
        />
        <AttendanceInfo
          title='미입실자'
          count={`${filteredNotCheckin.length}명`}
          attendanceInfo={filteredNotCheckin}
        />
        {/* <AttendanceInfo
          title='조퇴예정자'
          count={`${data.earlyLeave.length}명`}
          attendanceInfo={data.earlyLeave}
        />
        <AttendanceInfo
          title='결석예정자'
          count={`${data.absent.length}명`}
          attendanceInfo={data.absent}
        /> */}
      </div>
      <div className={styles.attendanceChartWrapper}>
        <AttendanceStats
          title='이번주 평균 출석자'
          labels={weekdaysDates}
          statsData={mapedAttendance}
        />
      </div>
      <div className={styles.attendanceChartWrapper}>
        <AttendanceStats
          title='이번주 평균 지각자'
          labels={weekdaysDates}
          statsData={mapedLate}
        />
      </div>
    </section>
  );
}

export default DashBoardContent;
