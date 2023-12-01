import styles from './NoteContent.module.css';
import NoteReceiveList from './NoteReceiveList';
import NoteMenu from './NoteMenu';
import { useState } from 'react';
import NoteSendList from './NoteSendList';
import NoteTrashList from './NoteTrashList';

function NoteContent({ setIsShowingModal }) {
  const [viewStatus, setViewStatus] = useState('receive');

  const handleMenuClick = (value) => {
    setViewStatus(value);
  };

  return (
    <section className={styles.wrapper}>
      <NoteMenu handleMenuClick={handleMenuClick} />
      {viewStatus === 'receive' && (
        <NoteReceiveList setIsShowingModal={setIsShowingModal} />
      )}
      {viewStatus === 'send' && <NoteSendList />}
      {viewStatus === 'trash' && <NoteTrashList />}
    </section>
  );
}

export default NoteContent;
