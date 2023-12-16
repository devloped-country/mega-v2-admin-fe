import { useState } from "react";
import ContentHeader from "@components/common/ContentHeader";
import NoteContent from "@components/Note/NoteContent";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";

function Note() {
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
  console.log(data);
  const handleClickDeleteButton = () => {};

  return (
    <>
      <ContentHeader
        title="쪽지"
        classes={Object.entries(data.data.courseInfo)}
        setCourseId={setCourseId}
        img={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-paper-plane-3917567 2.svg`}
        buttonText="삭제하기"
        buttonImg={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-trash-3917242 (1) 1.svg`}
        isShowingButton
        onButtonAction={handleClickDeleteButton}
      />
      <NoteContent courseId={courseId} />
    </>
  );
}

export default Note;
