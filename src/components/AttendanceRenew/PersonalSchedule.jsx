import axios from "axios";
import PersonalContainer from "./PersonalContainer";
import styles from "./PersonalSchedule.module.css";
import { useFetch } from "@/hooks/useFetch";
import ContentLoading from "@components/common/ContentLoading";

function PersonalSchedule({ courseId }) {
  const { data, isLoading } = useFetch(
    [courseId],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/attendance/${courseId}/getUserListByCourse`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  const mapedData = data.data.map(({ id, name, email }) => (
    <PersonalContainer key={id} id={id} title={name} desc={email} courseId={courseId} src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/User-24.svg`} />
  ));

  return <section className={styles.wrapper}>{mapedData}</section>;
}

export default PersonalSchedule;
