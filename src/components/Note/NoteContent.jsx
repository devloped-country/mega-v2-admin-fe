import styles from "./NoteContent.module.css";
import NoteReceiveList from "./NoteReceiveList";
import NoteMenu from "./NoteMenu";
import { useState } from "react";
import NoteSendList from "./NoteSendList";
import NoteTrashList from "./NoteTrashList";
import NoteSearchMenu from "./NoteSearchMenu";
import NoteEditor from "./NoteEditor";
import ContentLoading from "@components/common/ContentLoading";

function NoteContent(courseId) {
  const [contentViewStatus, setContentViewStatus] = useState(false);
  const [noteViewStatus, setNoteViewStatus] = useState("receive");
  const [selectedIds, setSelectedIds] = useState([]);

  const handleMenuClick = (value) => {
    setNoteViewStatus(value);
  };

  const handleNoteSendClick = () => {
    setContentViewStatus(true);
  };

  const handleCancelClick = () => {
    setContentViewStatus(false);
    setNoteViewStatus("receive");
  };

  return (
    <section className={styles.wrapper}>
      {contentViewStatus ? (
        <>
          <NoteSearchMenu courseId={courseId} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
          <NoteEditor handleCancelClick={handleCancelClick} selectedIds={selectedIds} />
        </>
      ) : (
        <>
          <NoteMenu handleMenuClick={handleMenuClick} handleNoteSendClick={handleNoteSendClick} />
          {noteViewStatus === "receive" && <NoteReceiveList />}
          {noteViewStatus === "send" && <NoteSendList />}
          {noteViewStatus === "trash" && <NoteTrashList />}
        </>
      )}
    </section>
  );
}

export default NoteContent;
