import NoteItem from './NoteItem';
import NoteModal from './NoteModal';
import styles from './NoteList.module.css';
import { useState } from 'react';

function NoteReceiveList() {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [id, setId] = useState('');

  const handleClickList = (id) => {
    setIsShowingModal(true);
    setId(id);
  };

  const handleClose = () => {
    setIsShowingModal(false);
  };

  return (
    <section className={styles.wrapper}>
      <ul className={styles.noteList}>
        <NoteItem
          title='김예진 매니저님'
          desc='안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용안녕하세요, 훈련수당은 20일 기준 적용'
          date='2023-10-26'
          onClick={() => handleClickList(1)}
        />
      </ul>
      {isShowingModal && <NoteModal handleClose={handleClose} id={id} />}
    </section>
  );
}

export default NoteReceiveList;
