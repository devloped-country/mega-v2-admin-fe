import { createPortal } from 'react-dom';
import Modal from '@components/common/Modal';
import styles from './StudentRemoveModal.module.css';
import ModalButton from '@components/common/ModalButton';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

function StudentRemoveModal({ title, desc, onClose, onAction }) {
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingSelect, setIsShowingSelect] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState(
    classes && classes[0].name
  );
  const [selected, setSelected] = useState(false);

  const handleClickOption = ({ name }) => {
    setSelectedClassName(name);
    setIsShowingSelect(false);
    setSelected(false);
  };

  const handleClickSelect = () => {
    setSelected(true);
    setIsShowingSelect(true);
  };

  const mapedClasses =
    classes &&
    classes.map((v, i) => (
      <li
        key={i}
        className={styles.option}
        data-tag='classSelect'
        onClick={() => handleClickOption(v)}
      >
        {v.name}
      </li>
    ));

  return (
    <>
      {createPortal(
        <Modal onClose={onClose}>
          <div className={styles.wrapper}>
            <header className={styles.header}>
              <h2 className={styles.headerTitle}>{title}</h2>
              <p className={styles.desc}>{desc}</p>
              {isLoading ? (
                <div className={styles.loadingWrapper}>
                  <ClipLoader />
                </div>
              ) : (
                <div className={styles.modalWrapper}>
                  <div className={styles.innerWrapper}>
                    <h2 className={styles.title}>
                      <img
                        src={`${
                          import.meta.env.VITE_CLOUD_FRONT_ID
                        }/free-icon-font-attribution-pencil-9291615 1.svg`}
                        alt=''
                      />
                      기본정보 입력
                    </h2>
                    <dl className={styles.inputWrapper}>
                      <dt>이름</dt>
                      <dd>
                        <input
                          type='text'
                          placeholder='이름'
                          className={styles.input}
                          readOnly
                        />
                      </dd>
                    </dl>
                    <dl className={styles.inputWrapper}>
                      <dt>이메일</dt>
                      <dd>
                        <input
                          type='text'
                          placeholder='이메일'
                          className={styles.input}
                          readOnly
                        />
                      </dd>
                    </dl>
                    <dl className={styles.inputWrapper}>
                      <dt>휴대폰번호</dt>
                      <dd>
                        <input
                          type='text'
                          placeholder='휴대폰번호'
                          className={styles.input}
                          readOnly
                        />
                      </dd>
                    </dl>
                    <dl className={styles.inputWrapper}>
                      <dt>과정</dt>
                      <dd>
                        <input
                          type='text'
                          placeholder='과정'
                          className={styles.input}
                          readOnly
                        />
                      </dd>
                    </dl>
                  </div>
                </div>
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

export default StudentRemoveModal;
