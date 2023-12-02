import ContentHeader from '@components/common/ContentHeader';
import StudentContent from '@components/Student/StudentContent';
import StudentCreateModal from '@components/Student/StudentCreateModal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Student.module.css';

function Student() {
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);

  const [isShowingCreateModal, setIsShowingCreateModal] = useState(false);
  const [isShowingSelect, setIsShowingSelect] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState(
    classes && classes[0].name
  );
  const [selected, setSelected] = useState(false);

  const handleModalClose = () => {
    setIsShowingCreateModal(false);
  };

  const handleClickSelect = () => {
    setSelected(true);
    setIsShowingSelect(true);
  };

  const handleClickOption = ({ name }) => {
    setSelectedClassName(name);
    setIsShowingSelect(false);
    setSelected(false);
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
      <ContentHeader
        title='교육생'
        img={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-users-3914353 1.svg`}
        buttonImg={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-plus-small-3917179+1.svg`}
        buttonText='초대하기'
        isShowingButton={true}
        onButtonAction={() => {
          setIsShowingCreateModal(true);
        }}
      />
      <StudentContent />
      {isShowingCreateModal &&
        createPortal(
          <StudentCreateModal title='교육생 초대' onClose={handleModalClose}>
            <div className={styles.wrapper}>
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
                    />
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>과정</dt>
                  <dd>
                    {classes && (
                      <div className={styles.selectWrapper}>
                        <button
                          name='class'
                          className={styles.select}
                          data-tag='classSelect'
                          onClick={handleClickSelect}
                          type='button'
                        >
                          <p
                            className={styles.selectPlaceholder}
                            data-tag='classSelect'
                          >
                            {selectedClassName}
                          </p>
                          <span
                            className={`${styles.selectArrow} ${
                              selected && styles.selectArrowActive
                            }`}
                            data-tag='classSelect'
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_CLOUD_FRONT_ID
                              }/free-icon-font-angle-small-down-3916864+1.svg`}
                              alt='화살표'
                              data-tag='classSelect'
                            />
                          </span>
                        </button>
                        {isShowingSelect && (
                          <ul
                            className={styles.optionWrapper}
                            data-tag='classSelect'
                          >
                            {mapedClasses}
                          </ul>
                        )}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </StudentCreateModal>,
          document.body
        )}
    </>
  );
}

export default Student;
