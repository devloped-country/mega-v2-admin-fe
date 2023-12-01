import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import styles from './NoticeModal.module.css';
import ModalButton from '@components/common/ModalButton';
import NoticeModalTable from './NoticeModalTable';
import axios from 'axios';
import { useFetch } from '@/hooks/useFetch';
import ClipLoader from 'react-spinners/ClipLoader';

function NoticeModal({ title, desc, id, onClose, onAction }) {
  const { data: notice, isLoading } = useFetch(
    [],
    async () => await axios(`/api/notice/${id}`)
  );

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.desc}>{desc}</p>
              {isLoading ? (
                <div className={styles.loadingWrapper}>
                  <ClipLoader />
                </div>
              ) : (
                <NoticeModalTable
                  title={notice.data.data.title}
                  desc={notice.data.data.textContent}
                  author={notice.data.data.author}
                  date={notice.data.data.createdTime}
                />
              )}
            </header>
            <footer className={styles.footer}>
              <ModalButton text='취소' onAction={onClose} />
              <ModalButton type='confirmed' text='확인' onAction={onAction} />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default NoticeModal;
