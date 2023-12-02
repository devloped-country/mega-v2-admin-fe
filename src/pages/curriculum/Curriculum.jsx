import { useState } from 'react';
import ContentHeader2 from '@components/common/ContentHeader2';
import CurriculumContent from '@components/Curriculum/CurriculumContent';
import { useNavigate } from 'react-router-dom';

function Curriculum() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);

  const handleClickSaveButton = () => {
    navigate('/notice/saved');
  };

  return (
    <section>
      <ContentHeader2
        title='커리큘럼'
        classes={classes}
        img='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-clipboard-list-7857307 1.svg'
        buttonImg='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-plus-small-3917179+1.svg'
        buttonText='추가하기'
        buttonImg2='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-rectangle-list-10742286%201.svg'
        buttonText2='순서변경'
        isShowingButton={true}
        onButtonAction={handleClickSaveButton}
      />
      <CurriculumContent />
      
    </section>
  );
}

export default Curriculum;
