import { createPortal } from "react-dom";
import Modal from "../common/Modal";
import Button from "../common/Button";
import styles from './CurriculumDeleteModal.module.css';
import ModalButton from '@components/common/ModalButton';



function CurriculumDeleteModal({title1, title2, onClose, onAction}) {

  const onButtonAction = () => {}

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.container}>
            <h2 className={styles.headerTitle}> 커리큘럼 삭제</h2>
            <div className={styles.wrapper}>
              <div className={styles.innerWrapper}>
                <h2 className={styles.title}>
                  <img 
                    src={`${
                      import.meta.env.VITE_CLOUD_FRONT_ID
                    }/free-icon-font-attribution-pencil-9291615 1.svg`}
                    alt=''
                  />
                  {title1}
                </h2>
                <dl className={styles.inputWrapper}>
                  <dt>교과목명</dt>
                  <dd>
                    <p className={styles.input}>
                      리눅스 시스템 이해하기
                    </p>
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>시간</dt>
                  <dd>
                    <p className={styles.input}>
                      35
                    </p>
                  </dd>
                </dl>
              </div>
            </div>

            <div className={styles.wrapper}>
              <div className={styles.innerWrapper}>
                <h2 className={styles.title}>
                  <img 
                    src={`${
                      import.meta.env.VITE_CLOUD_FRONT_ID
                    }/free-icon-font-attribution-pencil-9291615 1.svg`}
                    alt=''
                  />
                  {title2}
                </h2>
                <dl className={styles.inputWrapper}>
                  <dt>시작 기간</dt>
                  <dd>
                    <p className={styles.input}>
                      23.05.25
                    </p>
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>종료 기간</dt>
                  <dd>
                    <p className={styles.input}>
                      23.06.01
                    </p>
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                    <dt>상세 교과 정보</dt>
                    
                </dl>
              </div>
            </div>
                
            <footer className={styles.footer}>
              <ModalButton text='취소' onAction={onClose} />
              <ModalButton type='confirmed' text='삭제' onAction={onAction} />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default CurriculumDeleteModal;