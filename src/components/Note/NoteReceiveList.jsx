import NoteItem from "./NoteItem";
import NoteModal from "./NoteModal";
import styles from "./NoteList.module.css";
import { useEffect, useState } from "react";
import { useNewSocket } from "@/hooks/useNewSocket";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";

function NoteReceiveList() {
  const { receivedNotes } = useNewSocket();
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [messages, setMessages] = useState([]);
  // const [id, setId] = useState("");

  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: "/api/note/received",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  );

  useEffect(() => {
    console.log(receivedNotes + "noteList");
    setMessages(receivedNotes);
  }, [receivedNotes]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No received notes.</div>;
  }

  const handleClickList = (id) => {
    setIsShowingModal(true);
    setId(id);
  };

  const handleClose = () => {
    setIsShowingModal(false);
  };

  //  const mappedData = data.data.map(({ id, title, content, time }) => {
  //    <NoteItem key={id} title={title} desc={content} date={time} onClick={() => handleClickList(id)} />;
  //  });

  // const modalData = <NoteModal handleClose={handleClose} id={id} data={data} />;
  //{data && mappedData}
  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>
        {messages &&
          messages.map((note, index) => {
            return <NoteItem key={index} title={note.from} desc={note.title} date={new Date().toLocaleDateString()} onClick={() => handleClickList(index)} />;
          })}
        {!receivedNotes.length && !data ? (
          <div>Not received notes.</div>
        ) : (
          data.data.map((note, index) => <NoteItem key={index} title={note.title} desc={note.content} date={note.time} onClick={() => handleClickList(index)} />)
        )}
      </ul>
      {isShowingModal && <NoteModal handleClose={handleClose} id={id} data={receivedNotes} note={note} />}
    </section>
  );
}

export default NoteReceiveList;
