import { useState } from "react";
import ContentHeader from "@components/common/ContentHeader";
import NoteContent from "@components/Note/NoteContent";

function Note() {
  const [classes, setClasses] = useState([
    { name: "클라우드 네이티브 애플리케이션 개발자 양성과정", class: "dev" },
    { name: "클라우드 엔지니어 전문가 양성과정", class: "devops" },
  ]);

  const handleClickDeleteButton = () => {};

  return (
    <>
      <ContentHeader
        title="쪽지"
        img={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-paper-plane-3917567 2.svg`}
        buttonText="삭제하기"
        buttonImg={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-trash-3917242 (1) 1.svg`}
        isShowingButton
        classes={classes}
        onButtonAction={handleClickDeleteButton}
      />
      <NoteContent />
    </>
  );
}

export default Note;
