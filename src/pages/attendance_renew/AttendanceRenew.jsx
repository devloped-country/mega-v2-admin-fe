import { useState } from "react";
import styles from "./AttendanceRenew.module.css";
import ContentHeader from "@components/common/ContentHeader";
import AttendanceContent from "@components/AttendanceRenew/AttendanceContent";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";
import ContentLoading from "@components/common/ContentLoading";

function AttendanceRenew() {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: "/api/auth/read/manager_course",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    {
      onSuccess: ({ data }) => {
        setCourseId(parseInt(Object.entries(data.courseInfo)[0][0]));
      },
    }
  );

  const [courseId, setCourseId] = useState(data && Object.entries(data.data.courseInfo)[0]);

  if (isLoading) {
    return;
  }

  const handleClickPrintButton = () => {
    console.log("프린트");
  };

  return (
    <section className={styles.wrapper}>
      <ContentHeader
        title="출결"
        setCourseId={setCourseId}
        classes={Object.entries(data.data.courseInfo)}
        img={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-user-time-3914150 1.svg`}
        buttonImg={`${import.meta.env.VITE_CLOUD_FRONT_ID}/print 1.svg`}
        buttonText="인쇄하기"
        isShowingButton={false}
        onButtonAction={handleClickPrintButton}
      />
      <AttendanceContent courseId={courseId} />
    </section>
  );
}

export default AttendanceRenew;
