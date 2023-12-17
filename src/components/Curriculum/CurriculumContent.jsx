import styles from './CurriculumContent.module.css';
import CurriculumItem from './CurriculumItem';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import { useState } from 'react';
import CurriculumUpdateModal from './CurriculumUpdateModal';
import CurriculumDeleteModal from './CurriculumDeleteModal';
import ContentLoading from '@/components/common/ContentLoading';
import { useMutation } from '@/hooks/useMutation';
import CurriculumAddModals from '@components/Curriculum/CurriculumAddModals';

function CurriculumContent({
  courseId,
  isShowingAddModal,
  setIsShowingAddModal,
}) {
  const [isShowingUpdateModal, setIsShowingUpdateModal] = useState(false);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);
  const [curriculumId, setCurriculumId] = useState(null);

  const {
    data: curriculum,
    isLoading,
    refetch,
  } = useFetch(
    [courseId],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/curriculum/read/${courseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  const { mutate: deleteMutate } = useMutation(
    async (params) =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/curriculum/delete/${params.id}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
      onSuccess: () => {
        closeDeleteModal();
        refetch();
      },
    }
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  const closeUpdateModal = () => {
    setIsShowingUpdateModal(false);
  };

  const closeDeleteModal = () => {
    setIsShowingDeleteModal(false);
  };

  const onClick = (id) => {
    setCurriculumId(id);
  };

  const onCurriculumDelete = (id) => {
    deleteMutate({ id });
  };

  const closeAddModal = () => {
    setIsShowingAddModal(false);
  };

  const mapedCurriculum =
    curriculum &&
    curriculum.data.data.map(
      ({ curriculum_id, subject, time, startDate, endDate, content }) => {
        return (
          <CurriculumItem
            key={curriculum_id}
            id={curriculum_id}
            subject={subject}
            courseId={courseId}
            curriculumId={curriculumId}
            time={time}
            startDate={startDate}
            endDate={endDate}
            contents={content}
            onClick={onClick}
            setIsShowingUpdateModal={setIsShowingUpdateModal}
            setIsShowingDeleteModal={setIsShowingDeleteModal}
          />
        );
      }
    );

  return (
    <section className={styles.wrapper}>
      <ol className={styles.curriculumList}>{mapedCurriculum}</ol>
      {isShowingUpdateModal && (
        <CurriculumUpdateModal
          title1='기본 정보 입력'
          title2='상세 정보 입력'
          courseId={courseId}
          curriculumId={curriculumId}
          onClose={closeUpdateModal}
          refetch={refetch}
        />
      )}
      {isShowingDeleteModal && (
        <CurriculumDeleteModal
          title1='기본 정보'
          title2='상세 정보'
          courseId={courseId}
          curriculumId={curriculumId}
          onClose={closeDeleteModal}
          onAction={onCurriculumDelete}
        />
      )}
      {isShowingAddModal && (
        <CurriculumAddModals
          courseId={courseId}
          title1='기본 정보 입력'
          title2='상세 정보 입력'
          onClose={closeAddModal}
          refetch={refetch}
        />
      )}
    </section>
  );
}

export default CurriculumContent;
