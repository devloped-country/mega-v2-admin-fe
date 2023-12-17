import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import ModalButton from '@components/common/ModalButton';
import styles from './NoteModal.module.css';
import axios from 'axios';
import { useFetch } from '@/hooks/useFetch';
import ContentLoading from '@components/common/ContentLoading';

function NoteModal({ id, handleClose }) {
  console.log(id);
  const { data: note, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/note/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  return (
    <>
      {createPortal(
        <Modal onClose={handleClose}>
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <h2 className={styles.title}>{isLoading || note.data.title}</h2>
              <div className={styles.info}>
                <dl className={styles.noteInfoList}>
                  <dt>보낸사람 : </dt>
                  <dd>{isLoading || note.data.from}</dd>
                </dl>
                <dl className={styles.noteInfoList}>
                  <dt>받는사람 : </dt>
                  <dd>{isLoading || note.data.to.join(', ')}</dd>
                </dl>
                <dl className={styles.noteInfoList}>
                  <dt>작성일시 : </dt>
                  <dd>{isLoading || note.data.time}</dd>
                </dl>
              </div>
              {isLoading ? (
                <div className={styles.loadingWrapper}>
                  <ContentLoading />
                </div>
              ) : (
                <div className={styles.content}>{note.data.content}</div>
              )}
            </header>
            <footer className={styles.footer}>
              <ModalButton
                type='confirmed'
                text='확인'
                onAction={handleClose}
              />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default NoteModal;
