import styles from './NoteContent.module.css';
import NoteReceiveList from './NoteReceiveList';
import NoteMenu from './NoteMenu';
import { useState } from 'react';
import NoteSendList from './NoteSendList';
import NoteTrashList from './NoteTrashList';
import NoteSearchMenu from './NoteSearchMenu';
import NoteEditor from './NoteEditor';

function NoteContent() {
  const [contentViewStatus, setContentViewStatus] = useState(false);
  const [noteViewStatus, setNoteViewStatus] = useState('receive');

  const handleMenuClick = (value) => {
    setNoteViewStatus(value);
  };

  const handleNoteSendClick = () => {
    setContentViewStatus(true);
  };

  const handleCancelClick = () => {
    setContentViewStatus(false);
    setNoteViewStatus('receive');
  };

  return (
    <section className={styles.wrapper}>
      {contentViewStatus ? (
        <>
          <NoteSearchMenu />
          <NoteEditor handleCancelClick={handleCancelClick} />
        </>
      ) : (
        <>
          <NoteMenu
            handleMenuClick={handleMenuClick}
            handleNoteSendClick={handleNoteSendClick}
          />
          {noteViewStatus === 'receive' && <NoteReceiveList />}
          {noteViewStatus === 'send' && <NoteSendList />}
          {noteViewStatus === 'trash' && <NoteTrashList />}
        </>
      )}
    </section>
  );
}

export default NoteContent;
