import Attendance from '@components/AttendanceRenew/Attendance';
import styles from './AttendancePersonal.module.css';
import { useFetch } from '@/hooks/useFetch';
import ContentLoading from '@components/common/ContentLoading';
import axios from 'axios';

function AttendancePersonal({ id }) {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: `/api/attendance/${id}/totalById`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  const mapedData = data.data[0].attendanceResponse
    .sort((a, b) => new Date(a.attendanceDate) - new Date(b.attendanceDate))
    .map(({ id, attendanceDate, startTime, endTime, statusDescription }) => (
      <Attendance
        key={id}
        date={attendanceDate}
        startTime={startTime}
        endTime={endTime}
        attendance={statusDescription}
      />
    ));

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>날짜</th>
          <th className={styles.th}>입실 시간</th>
          <th className={styles.th}>퇴실 시간</th>
          <th className={styles.th}>출결</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>{mapedData}</tbody>
    </table>
  );
}

export default AttendancePersonal;
