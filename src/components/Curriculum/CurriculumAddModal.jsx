import { createPortal } from "react-dom";
import Modal from "../common/Modal";
import Button from "../common/Button";
import styles from './CurriculumAddModal.module.css';
import ModalButton from '@components/common/ModalButton';

function CurriculumAddModal({title1, title2, onClose, onAction}) {

  const onAddButtonAction = () => {

  }

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.container}>
            <h2 className={styles.headerTitle}> 커리큘럼 추가하기</h2>
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
                    <input
                      type='text'
                      placeholder='리눅스 시스템 이해하기'
                      className={styles.input}
                    />
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>시간</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='35'
                      className={styles.input}
                    />
                  </dd>
                </dl>
              </div>
            </div>

            <div className={styles.wrapper}>
              <div className={styles.innerWrapperScroll}>
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
                    <input
                      type='text'
                      placeholder='23.05.25'
                      className={styles.input}
                    />
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>종료 기간</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='23.06.01'
                      className={styles.input}
                    />
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                    <dt>상세 교과 정보</dt>
                    <dd>
                    <Button 
                      text='추가하기'
                      img='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-plus-small-3917179+1.svg' 
                      onAction={onAddButtonAction} />
                    </dd>
                </dl>
                <div className={styles.buttonPosition}>
                  <input
                    type='text'
                    placeholder='상세 교과명'
                    className={styles.AddDetailInput}
                  />
                  <img 
                    src="https://d2f3kqq80r3o3g.cloudfront.net/GreyDeleteDetailButton.svg"
                    className={styles.deleteInput}
                  />
                </div>
                <div className={styles.buttonPosition}>
                  <input
                    type='text'
                    placeholder='상세 교과명'
                    className={styles.AddDetailInput}
                  />
                  <img 
                    src="https://d2f3kqq80r3o3g.cloudfront.net/GreyDeleteDetailButton.svg"
                    className={styles.deleteInput}
                  />
                </div>
                <div className={styles.buttonPosition}>
                  <input
                    type='text'
                    placeholder='상세 교과명'
                    className={styles.AddDetailInput}
                  />
                  <img 
                    src="https://d2f3kqq80r3o3g.cloudfront.net/GreyDeleteDetailButton.svg"
                    className={styles.deleteInput}
                  />
                </div>
                <div className={styles.buttonPosition}>
                  <input
                    type='text'
                    placeholder='상세 교과명'
                    className={styles.AddDetailInput}
                  />
                  <img 
                    src="https://d2f3kqq80r3o3g.cloudfront.net/GreyDeleteDetailButton.svg"
                    className={styles.deleteInput}
                  />
                </div>
        
              </div>
            </div>
                
            <footer className={styles.footer}>
              <ModalButton text='취소' onAction={onClose} />
              <ModalButton type='mutated' text='추가' onAction={onAction} />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default CurriculumAddModal;