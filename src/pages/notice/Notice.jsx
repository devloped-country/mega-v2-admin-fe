import { useState } from 'react';
import ContentHeader from '@components/common/ContentHeader';
import NoticeContent from '@components/Notice/NoticeContent';
import { useNavigate } from 'react-router-dom';
import styles from './Notice.module.css';
import axios from 'axios';
import { useFetch } from '@/hooks/useFetch';

function Notice() {
  const navigate = useNavigate();

  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: 'https://admin.mzc-appmega.click/api/auth/read/manager_course',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
      onSuccess: ({ data }) => {
        setCourseId(parseInt(Object.entries(data.courseInfo)[0][0]));
        setManagerId(Object.entries(data.managerInfo)[0][0]);
      },
    }
  );

  const [courseId, setCourseId] = useState(
    data && Object.entries(data.data.courseInfo)[0]
  );
  const [managerId, setManagerId] = useState(
    data && Object.entries(data.data.managerInfo)[0]
  );

  if (isLoading) {
    return;
  }

  const handleClickSaveButton = () => {
    navigate(`/notice/saved/${courseId}/${managerId}`);
  };

  return (
    <section className={styles.wrapper}>
      <ContentHeader
        title='공지사항'
        classes={Object.entries(data.data.courseInfo)}
        setCourseId={setCourseId}
        img={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-megaphone-3914404 1.svg`}
        buttonImg={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-plus-small-3917179+1.svg`}
        buttonText='등록하기'
        isShowingButton={true}
        onButtonAction={handleClickSaveButton}
      />
      <NoticeContent courseId={courseId} />
    </section>
  );
}

export default Notice;
