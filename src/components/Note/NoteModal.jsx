import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import ModalButton from '@components/common/ModalButton';
import styles from './NoteModal.module.css';
import axios from 'axios';
import { useFetch } from '@/hooks/useFetch';
import ClipLoader from 'react-spinners/ClipLoader';

function NoteModal({ id, handleClose }) {
  const { data: note, isLoading } = useFetch(
    [],
    async () => await axios(`/api/note/${id}`)
  );

  return (
    <>
      {createPortal(
        <Modal onClose={handleClose}>
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <h2 className={styles.title}>
                주말에 강의장을 이용할 수 있을까요?
              </h2>
              <div className={styles.info}>
                <dl className={styles.noteInfoList}>
                  <dt>보낸사람 : </dt>
                  <dd>김유범</dd>
                </dl>
                <dl className={styles.noteInfoList}>
                  <dt>받는사람 : </dt>
                  <dd>김예진</dd>
                </dl>
                <dl className={styles.noteInfoList}>
                  <dt>작성일시 : </dt>
                  <dd>2023.10.16 (월) 16: 55</dd>
                </dl>
              </div>
              {isLoading ? (
                <div className={styles.loadingWrapper}>
                  <ClipLoader />
                </div>
              ) : (
                <div className={styles.content}>
                  주말에 강의장을 이용할 수 있을까요?
                </div>
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
