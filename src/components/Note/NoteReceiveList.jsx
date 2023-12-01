import { useNavigate } from 'react-router-dom';
import NoteItem from './NoteItem';
import styles from './NoteList.module.css';

function NoteReceiveList({ setIsShowingModal }) {
  const navigate = useNavigate();

  const handleClickList = () => {
    console.log('!');
  };

  return (
    <section className={styles.wrapper} onClick={() => setIsShowingModal(true)}>
      <ul className={styles.noteList}>
        <NoteItem
          title='김예진 매니저님'
          desc='안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용'
          date='2023-10-26'
          onClick={handleClickList}
        />
      </ul>
    </section>
  );
}

export default NoteReceiveList;
