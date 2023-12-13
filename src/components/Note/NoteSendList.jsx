import NoteItem from "./NoteItem";
import styles from "./NoteList.module.css";
import { useFetch } from "@/hooks/useFetch";

function NoteSendList() {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: "/api/note/sent",
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

  const mappedData = data.map(({ id, title, content, to, time }) => {
    <NoteItem key={id} title={to} desc={title} date={time} onClick={() => handleClickList(id)} />;
  });

  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>{mappedData}</ul>
    </section>
  );
}

export default NoteSendList;
