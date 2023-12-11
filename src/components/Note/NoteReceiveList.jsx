import NoteItem from "./NoteItem";
import NoteModal from "./NoteModal";
import styles from "./NoteList.module.css";
import { useState } from "react";

function NoteReceiveList() {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [id, setId] = useState("");

  // const { data, isLoading } = useFetch([], async () => await axios("/api"));

  // if (isLoading) {
  //   return;
  // }

  const handleClickList = (id) => {
    setIsShowingModal(true);
    setId(id);
  };

  const handleClose = () => {
    setIsShowingModal(false);
  };

  // const mapedData = data.map(({ id, title, desc, date }) => {
  //   <NoteItem title={title} desc={desc} date={date} onClick={() => handleClickList(id)} />;
  // });

  return (
    <section className={styles.wrapper}>
      {/* <ul className={styles.noteList}>{mapedData}</ul> */}
      {isShowingModal && <NoteModal handleClose={handleClose} id={id} />}
    </section>
  );
}

export default NoteReceiveList;
