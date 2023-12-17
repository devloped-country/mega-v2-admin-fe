import NoteItem from "./NoteItem";
import styles from "./NoteList.module.css";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";

function NoteSendList() {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: "https://admin.mzc-appmega.click/api/note/sent",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No sent notes.</div>;
  }

  const mappedData = data.data.map(({ id, title, content, to, time }) => {
    return <NoteItem key={id} title={note.to} desc={note.title} date={note.time} onClick={() => handleClickList(note.id)} />;
  });

  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>{mappedData}</ul>
    </section>
  );
}

export default NoteSendList;
