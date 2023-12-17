import styles from './CurriculumChangeContent.module.css';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import ContentLoading from '@/components/common/ContentLoading';
import CurriculumChangeItem from './CurriculumChangeItem';
import { useState } from 'react';

function CurriculumChangeContent({ courseId }) {

  const [curriculumId, setCurriculumId] = useState(null);

  const {
    data: curriculum,
    isLoading,
  } = useFetch(
    [courseId],
    async () =>
      await axios({
        url: `/api/curriculum/read/${courseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  if (isLoading) {
    return <ContentLoading />;
  }

  const onClick = (id) => {
    setCurriculumId(id);
  };

  const mapedCurriculum = curriculum.data.data.map(
    ({ curriculum_id, subject, time, startDate, endDate, content }) => {
      return (
        <CurriculumChangeItem
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
        />
      );
    }
  );

  return(
    <section className={styles.wrapper}>
      <ol className={styles.curriculumList}>{mapedCurriculum}</ol>
    </section>
  );
}

export default CurriculumChangeContent;