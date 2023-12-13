import { useState } from 'react';
import ContentHeader2 from '@components/common/ContentHeader2';
import CurriculumContent from '@components/Curriculum/CurriculumContent';
import { useNavigate } from 'react-router-dom';
import CurriculumAddModals from '../../components/Curriculum/CurriculumAddModals';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

function Curriculum() {
  const navigate = useNavigate();
  const [isShowingAddModal, setIsShowingAddModal] = useState(false);
  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: '/api/auth/read/manager_course',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
      onSuccess: ({ data }) => {
        setCourseId(parseInt(Object.entries(data.courseInfo)[0][0]));
      },
    }
  );
  const [courseId, setCourseId] = useState(
    data && Object.entries(data.data.courseInfo)[0]
  );
  // const [classes, setClasses] = useState([
  //   { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
  //   { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  // ]);

  if (isLoading) {
    return;
  }

  const handleClickAddButton = (e) => {
    e.stopPropagation();
    setIsShowingAddModal(true);
  };

  const closeAddModal = () => {
    setIsShowingAddModal(false);
  };

  const handleClickChangeButton = () => {
    navigate('listChange');
  }

  return (
    <section>
      <ContentHeader2
        title='커리큘럼'
        classes={Object.entries(data.data.courseInfo)}
        setCourseId={setCourseId}
        img='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-clipboard-list-7857307 1.svg'
        buttonImg='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-plus-small-3917179+1.svg'
        buttonText='추가하기'
        buttonImg2='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-rectangle-list-10742286%201.svg'
        buttonText2='순서변경'
        isShowingButton={true}
        onButtonAction1={handleClickAddButton}
        onButtonAction2={handleClickChangeButton}
      />
      <CurriculumContent courseId={courseId} />
      {isShowingAddModal && (
        <CurriculumAddModals
          courseId={courseId}
          title1='기본 정보 입력'
          title2='상세 정보 입력'
          onClose={closeAddModal}
        />
      )}
    </section>
  );
}

export default Curriculum;
