import ContentHeader from '@components/common/ContentHeader';
import StudentContent from '@components/Student/StudentContent';
import StudentCreateModal from '@components/Student/StudentCreateModal';
import { useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Student.module.css';
import {
  addStudentReducer,
  initialStudentState,
} from '@/reducer/addStudentReducer';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';

function Student() {
  const [classes, setClasses] = useState([
    { name: '개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);

  const [isShowingCreateModal, setIsShowingCreateModal] = useState(false);
  const [isShowingSelect, setIsShowingSelect] = useState(false);
  const [selected, setSelected] = useState(false);
  const [studentState, dispatch] = useReducer(
    addStudentReducer,
    initialStudentState
  );
  const { mutate } = useMutation(
    async (param) =>
      await axios({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        url: '/api/user/save_user',
        method: 'post',
        data: param,
      }),
    {
      onSuccess: () => {
        setIsShowingCreateModal(false);
      },
    }
  );

  const handleModalClose = () => {
    setIsShowingCreateModal(false);
  };

  const handleClickSelect = () => {
    setSelected(true);
    setIsShowingSelect(true);
  };

  const handleClickOption = ({ name }) => {
    dispatch({ type: 'INPUT', payload: 'course', value: name });
    setIsShowingSelect(false);
    setSelected(false);
  };

  const onRegisterStudent = () => {
    const { name, email, phone, course } = studentState;

    if (!name && !email && !phone && !course) {
      return;
    }

    mutate({
      name,
      email,
      phone,
      course,
    });
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
          <StudentCreateModal
            title='교육생 초대'
            onClose={handleModalClose}
            onAction={onRegisterStudent}
          >
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
                      value={studentState.name}
                      onChange={({ target }) =>
                        dispatch({
                          type: 'INPUT',
                          payload: 'name',
                          value: target.value,
                        })
                      }
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
                      value={studentState.email}
                      onChange={({ target }) =>
                        dispatch({
                          type: 'INPUT',
                          payload: 'email',
                          value: target.value,
                        })
                      }
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
                      value={studentState.phone}
                      onChange={({ target }) =>
                        dispatch({
                          type: 'INPUT',
                          payload: 'phone',
                          value: target.value,
                        })
                      }
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
                            {studentState.course}
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
