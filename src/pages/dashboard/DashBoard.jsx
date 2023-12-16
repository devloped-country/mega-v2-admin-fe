import ContentHeader from "@components/common/ContentHeader";
import { useState } from "react";
import DashBoardContent from "@components/DashBoard/DashBoardContent";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";

export default function Home() {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: "https://admin.mzc-appmega.click/api/auth/read/manager_course",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

  return (
    <>
      <ContentHeader
        title="홈"
        classes={Object.entries(data.data.courseInfo)}
        setCourseId={setCourseId}
        img={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-home-3917033 1.svg`}
        isShowingButton={false}
      />
      <DashBoardContent courseId={courseId} />
    </>
  );
}
