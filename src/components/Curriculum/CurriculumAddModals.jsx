import { createPortal } from 'react-dom';
import Modal from '../common/Modal';
import Button from '../common/Button';
import styles from './CurriculumAddModals.module.css';
import ModalButton from '@components/common/ModalButton';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { useState } from 'react';
import DetailContent from './DetailContent';
import { v4 as uuidv4 } from 'uuid';

function CurriculumAddModals({ title1, title2, onClose, courseId, refetch }) {
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contents, setContents] = useState([{ id: uuidv4(), value: '' }]);
  console.log(title1, title2, onClose, courseId, refetch);
  const onAddButtonAction = () => {
    mutate({
      courseId: parseInt(courseId),
      subject,
      time: parseInt(time),
      startDate,
      endDate,
      contents: contents.map(({ value }) => value),
    });
  };

  const { mutate } = useMutation(
    async (param) =>
      await axios({
        url: 'https://admin.mzc-appmega.click/api/curriculum/register',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'post',
        data: param,
      }),
    {
      onSuccess: () => {
        onClose();
        refetch();
      },
    }
  );

  const handleDeleteInput = (index) => {
    setContents((prev) => prev.filter((v) => v.id !== index));
  };

  const mapedContents = contents.map(({ id, value }) => {
    return (
      <DetailContent
        key={id}
        index={id}
        src='https://d2f3kqq80r3o3g.cloudfront.net/GreyDeleteDetailButton.svg'
        src2='https://d2f3kqq80r3o3g.cloudfront.net/BlackDeleteDetailButton.svg'
        placeholder='상세 교과명'
        value={value}
        setContents={setContents}
        contents={contents}
        onDelete={handleDeleteInput}
      />
    );
  });

  const onAddDetailSubject = () => {
    setContents((prev) => [...prev, { id: uuidv4(), value: '' }]);
  };

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
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
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
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
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
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
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
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </dd>
                </dl>
                <dl className={styles.inputWrapperDetail}>
                  <div className={styles.addAlign}>
                    <dt>상세 교과 내용</dt>
                    <dd>
                      <Button
                        text='추가하기'
                        img='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-plus-small-3917179+1.svg'
                        onAction={onAddDetailSubject}
                      />
                    </dd>
                  </div>
                </dl>
                <div className={styles.buttonPosition}>{mapedContents}</div>
              </div>
            </div>

            <footer className={styles.footer}>
              <ModalButton text='취소' onAction={onClose} />
              <ModalButton
                type='mutated'
                text='추가'
                onAction={onAddButtonAction}
              />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default CurriculumAddModals;
