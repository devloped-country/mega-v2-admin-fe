import AttendanceInfo from '@components/DashBoard/AttendanceInfo';
import styles from './DashBoardContent.module.css';
import EducationPersonnelInfo from '@components/DashBoard/EducationPersonnelInfo';
import AttendanceStats from '@components/DashBoard/AttendanceStats';
import { useFetchs } from '@/hooks/useFetchs';
import ContentLoading from '@components/common/ContentLoading';
import { useEffect } from 'react';

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
  const {
    data: dashboard,
    isLoading,
    refetch,
  } = useFetchs(
    [courseId],
    [
      {
        url: `https://user.mzc-appmega.click/api/dashboard/${courseId}/status`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      {
        url: `https://user.mzc-appmega.click/api/dashboard/${courseId}/attendance`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      {
        url: `https://user.mzc-appmega.click/api/dashboard/${courseId}/late`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    ]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!dashboard && isLoading) {
    return <ContentLoading />;
  }

  // 0 미입실
  // 1 입실
  // 2 지각
  // 3 조퇴
  // 4 공가

  const filteredTotal = dashboard[0].filter(
    (info) => info.attendanceStatus !== 3 || info.attendanceStatus !== 4
  );

  const filteredNotCheckin = dashboard[0]
    .filter(
      (info) => info.attendanceStatus !== 3 || info.attendanceStatus !== 4
    )
    .filter((info) => info.attendanceStatus === 0);

  const filteredCheckin = dashboard[0]
    .filter(
      (info) => info.attendanceStatus !== 3 || info.attendanceStatus !== 4
    )
    .filter(
      (info) => info.attendanceStatus === 1 || info.attendanceStatus === 2
    );

  const filterLeave = dashboard[0].filter(
    (info) => info.attendanceStatus === 3
  );

  const filterAbsent = dashboard[0].filter(
    (info) => info.attendanceStatus === 4
  );

  const weekdaysDates = getWeekdaysDates();

  const mapedAttendance = dashboard[1].map(({ count }) => count || 0);

  const mapedLate = dashboard[2].map(({ count }) => count || 0);

  if (dashboard && isLoading) {
    return (
      <section className={styles.wrapper}>
        <header className={styles.header}>
          <EducationPersonnelInfo
            title='전체 교육생'
            content={`${filteredTotal.length}명`}
          />
          <EducationPersonnelInfo
            title='입실율'
            content={`${filteredCheckin.length}명 / ${(
              (filteredCheckin.length / filteredTotal.length) *
              100
            ).toFixed(1)}%`}
          />
          <EducationPersonnelInfo
            title='미입실율'
            content={`${filteredNotCheckin.length}명 / ${(
              (filteredNotCheckin.length / filteredTotal.length) *
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
          <AttendanceInfo
            title='조퇴예정자'
            count={`${filterLeave.length}명`}
            attendanceInfo={filterLeave}
          />
          <AttendanceInfo
            title='결석예정자'
            count={`${filterAbsent.length}명`}
            attendanceInfo={filterAbsent}
          />
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
        <AttendanceInfo
          title='조퇴예정자'
          count={`${filterLeave.length}명`}
          attendanceInfo={filterLeave}
        />
        <AttendanceInfo
          title='결석예정자'
          count={`${filterAbsent.length}명`}
          attendanceInfo={filterAbsent}
        />
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
