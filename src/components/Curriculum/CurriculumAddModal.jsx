import { createPortal } from "react-dom";
import Modal from "../common/Modal";
import Button from "../common/Button";
import styles from './CurriculumAddModal.module.css';
import ModalButton from '@components/common/ModalButton';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { useState } from "react";
import DetailContent from "./DetailContent";

function CurriculumAddModal({title1, title2, onClose, onAction}) {
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contents, setContents] = useState('');


  const course = "과정1";

  const onAddButtonAction = () => {
    console.log({
      course,
      subject,
      time,
      startDate,
      endDate,
      contents
    })

    mutate({
      course,
      subject,
      time,
      startDate,
      endDate,
      contents
    });

  }

  const { mutate } = useMutation(
    async (param) => await axios({ url: '/api/curriculum/register', method: 'post', data: param }),

  );

  function formatDate(inputDate) {
    const [year, month, day] = inputDate.split('.').map((value) => parseInt(value, 10));
    return new Date(`${year + 2000}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
  }

  //추가하기 버튼 눌렀을 때 컴포넌트 추가
  const addContents = () => {
    
  }

  // const mapedNotice = notices.data.data.content.map(
  //   ({ id, title, author, content, date, tags, textContent }) => {
  //     return (
  //       <NoticeItem
  //         key={id}
  //         id={id}
  //         title={title}
  //         author={author}
  //         content={content}
  //         textContent={textContent}
  //         date={date}
  //         tags={tags}
  //         refetch={refetch}
  //       />
  //     );
  //   }
  // );

  //삭제 이미지 클릭할 때 컴포넌트 삭제
  const handleDeleteInput = () => {

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
                    // onChange={(e) => {     
                    //   setStartDate(e.target.value);
                    // }}
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
                <dl className={styles.inputWrapper}>
                    <dt>상세 교과 정보</dt>
                    <dd>
                    <Button 
                      text='추가하기'
                      img='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-plus-small-3917179+1.svg' 
                      onClick={() => {
                        addContents();
                      }}
                      />
                    </dd>
                </dl>
                <div className={styles.buttonPosition}>
                  <input
                    type='text'
                    placeholder='상세 교과명'
                    className={styles.AddDetailInput}
                    value={contents}
                      onChange={(e) => setContents(e.target.value)}
                  />
                  <img 
                    src="https://d2f3kqq80r3o3g.cloudfront.net/GreyDeleteDetailButton.svg"
                    className={styles.deleteInput}
                    onClick={() => handleDeleteInput(index)}
                  />
                </div>
                
              </div>
            </div>
                
            <footer className={styles.footer}>
              <ModalButton text='취소' onAction={onClose} />
              <ModalButton type='mutated' text='추가' onAction={onAddButtonAction} />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default CurriculumAddModal;