import axios from "axios";
import styles from "./AttendanceStat.module.css";
import AttendanceStatBodyTd from "./AttendanceStatBodyTd";
import AttendanceStatTh from "./AttendanceStatTh";
import { useFetch } from "@/hooks/useFetch";
import ContentLoading from "@components/common/ContentLoading";

function AttendanceStat({ courseId }) {
  const { data, isLoading } = useFetch(
    [courseId],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/attendance/${courseId}/total`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  const mapedData = data.data.map(({ attendanceResponse, attendanceSum, userResponse }, index) => {
    return (
      <AttendanceStatBodyTd key={index} attendanceSum={attendanceSum} attendanceResponse={attendanceResponse} name={userResponse.name} profile={`${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`} />
    );
  });

  return (
    <section className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <AttendanceStatTh date={data.data[0].attendanceResponse} />
        </thead>
        <tbody>{mapedData}</tbody>
      </table>
    </section>
  );
}

export default AttendanceStat;
