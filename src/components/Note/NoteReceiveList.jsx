import NoteItem from "./NoteItem";
import NoteModal from "./NoteModal";
import styles from "./NoteList.module.css";
import { useState } from "react";
import { useNewSocket } from "@/hooks/useNewSocket";
import { useFetch } from "@/hooks/useFetch";

function NoteReceiveList() {
  const { receivedNotes } = useNewSocket();
  const [isShowingModal, setIsShowingModal] = useState(false);
  // const [id, setId] = useState("");

  const { data, isLoading } = useFetch([], async () => await axios("/api/note/received"));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No received notes.</div>;
  }

  useEffect(() => {
    console.log(receivedNotes + "noteList");
  }, [receivedNotes]);

  const handleClickList = (id) => {
    setIsShowingModal(true);
    setId(id);
  };

  const handleClose = () => {
    setIsShowingModal(false);
  };

  const mappedData = data.map(({ id, title, content, time }) => {
    <NoteItem key={id} title={title} desc={content} date={time} onClick={() => handleClickList(id)} />;
  });

  const modalData = <NoteModal handleClose={handleClose} id={id} data={data} />;

  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>
        {!receivedNotes.length && !data ? (
          <div>Not received notes.</div>
        ) : (
          receivedNotes.map((note, index) => <NoteItem key={index} title={note.title} desc={note.content} date={note.date} onClick={() => handleClickList(index)} />)
        )}
        {data && mappedData}
      </ul>
      {isShowingModal && <NoteModal handleClose={handleClose} id={id} data={data} />}
    </section>
  );
}

export default NoteReceiveList;
