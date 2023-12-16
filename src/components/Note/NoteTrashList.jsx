import NoteItem from './NoteItem';
import styles from './NoteList.module.css';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

function NoteTrashList() {
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: 'https://admin.mzc-appmega.click/api/note/trash',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No notes.</div>;
  }

  const mappedData = data.data.map(({ id, title, content, time }) => {
    return (
      <NoteItem
        key={id}
        title={title}
        desc={content}
        date={time}
        onClick={() => handleClickList(id)}
      />
    );
  });

  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>{mappedData}</ul>
    </section>
  );
}

export default NoteTrashList;
