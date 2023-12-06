import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import styles from './StudentCreateModal.module.css';
import ModalButton from '@components/common/ModalButton';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

function StudentCreateModal({ title, onClose, onAction, children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              {isLoading ? (
                <div className={styles.loadingWrapper}>
                  <ClipLoader />
                </div>
              ) : (
                children
              )}
            </header>
            <footer className={styles.footer}>
              <ModalButton text='취소' onAction={onClose} />
              <ModalButton type='mutated' text='초대' onAction={onAction} />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default StudentCreateModal;
