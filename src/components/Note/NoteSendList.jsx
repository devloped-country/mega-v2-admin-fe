import NoteItem from "./NoteItem";
import styles from "./NoteList.module.css";
import { useFetch } from "@/hooks/useFetch";

function NoteSendList() {
  const { data, isLoading } = useFetch([], async () => await axios("/api/note/sent"));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No sent notes.</div>;
  }

  const mappedData = data.map(({ id, title, content, time }) => {
    <NoteItem key={id} title={title} desc={content} date={time} onClick={() => handleClickList(id)} />;
  });

  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>{mappedData}</ul>
    </section>
  );
}

export default NoteSendList;
