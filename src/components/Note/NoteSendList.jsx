import NoteItem from "./NoteItem";
import styles from "./NoteList.module.css";

function NoteSendList() {
  // const { data, isLoading } = useFetch([], async () => await axios("/api"));

  // if (isLoading) {
  //   return;
  // }

  // const mapedData = data.map(({ id, title, desc, date }) => {
  //   <NoteItem title={title} desc={desc} date={date} onClick={() => handleClickList(id)} />;
  // });

  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>
        {/* <NoteItem
          title="김유범 매니저님"
          desc="안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용"
          date="2023-10-26"
        /> */}
        {/* {mapedData} */}
      </ul>
    </section>
  );
}

export default NoteSendList;
