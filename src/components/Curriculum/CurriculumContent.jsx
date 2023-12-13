import styles from './CurriculumContent.module.css';
import CurriculumItem from './CurriculumItem';
import { v4 as uuidv4 } from 'uuid';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import { useState } from 'react';
import CurriculumUpdateModal from './CurriculumUpdateModal';
import CurriculumDeleteModal from "./CurriculumDeleteModal";

function CurriculumContent() {

  const [isShowingUpdateModal, setIsShowingUpdateModal] = useState(false);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);

  
  const [isShowingModal, setIsShowingModal] = useState(false);

  //커리큘럼 저장 상태(1.)
  const [curriculumId, setCurriculumId] = useState(null);

  const closeUpdateModal = () => {
    setIsShowingUpdateModal(false);
  }

  const closeDeleteModal = () => {
    setIsShowingDeleteModal(false);
  }

  const id = 2;

  const {
    data: curriculum,
    isLoading
  } = useFetch(
    [],
    async () => await axios(`/api/curriculum/read/${id}`)
  );

  if(isLoading) {
    return 
  }

  const onClick = (id) => {
    setCurriculumId(id);
  }
  
  console.log(curriculum)

  if(!curriculum) {
    return;
  }

  const mapedCurriculum = curriculum.data.data.map(
    ({curriculum_id,  subject, time, startDate, endDate, content}) => {
      return (
        <CurriculumItem 
          key={curriculum_id}
          id={curriculum_id}
          subject={subject}
          courseId={id}
          curriculumId={curriculumId}
          time={time}
          startDate={startDate}
          endDate={endDate}
          contents={content}
          onClick={onClick}
        />
      )
    }
  )

  return (
    <section className={styles.wrapper}>
      <ol className={styles.curriculumList}>
        {mapedCurriculum}
      </ol>
      {isShowingUpdateModal && (
        <CurriculumUpdateModal 
          title1='기본 정보 입력'
          title2='상세 정보 입력'
          onClose={closeUpdateModal}
        />
        )
      }
      {isShowingDeleteModal && (
        <CurriculumDeleteModal
          title1='기본 정보'
          title2='상세 정보'
          onClose={closeDeleteModal}
        />
        )
      }
    </section>
  );
}

export default CurriculumContent;