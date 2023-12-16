import { createPortal } from 'react-dom';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import styles from './CurriculumDeleteModal.module.css';
import ModalButton from '@components/common/ModalButton';
import axios from 'axios';
import { useFetch } from '@/hooks/useFetch';
import ClipLoader from 'react-spinners/ClipLoader';

function CurriculumDeleteModal({
  title1,
  title2,
  courseId,
  curriculumId,
  onClose,
  onAction,
}) {
  const { data: curriculum, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: `https://user.mzc-appmega.click/api/curriculum/read/${courseId}/${curriculumId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  if (isLoading) {
    return;
  }

  const curriculumInfo = curriculum.data;

  const mapedContent = curriculumInfo.content.map(({ content }, index) => {
    return (
      <p key={index} className={styles.DetailInput}>
        {content}
      </p>
    );
  });

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
                    <p className={styles.input}>{curriculumInfo.subject}</p>
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>시간</dt>
                  <dd>
                    <p className={styles.input}>{curriculumInfo.time}</p>
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
                    <p className={styles.input}>{curriculumInfo.startDate}</p>
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>종료 기간</dt>
                  <dd>
                    <p className={styles.input}>{curriculumInfo.endDate}</p>
                  </dd>
                </dl>
                <dl className={styles.inputWrapper}>
                  <dt>상세 교과 정보</dt>
                </dl>
                {mapedContent}
              </div>
            </div>

            <footer className={styles.footer}>
              <ModalButton text='취소' onAction={onClose} />
              <ModalButton
                type='confirmed'
                text='삭제'
                onAction={() => onAction(curriculumId)}
              />
            </footer>
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
}

export default CurriculumDeleteModal;
