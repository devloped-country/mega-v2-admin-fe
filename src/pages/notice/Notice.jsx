import { useState } from 'react';
import ContentHeader from '@components/common/ContentHeader';
import NoticeContent from '@components/Notice/NoticeContent';
import { useNavigate } from 'react-router-dom';
import styles from './Notice.module.css';

function Notice() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);

  const handleClickSaveButton = () => {
    navigate('/notice/saved');
  };

  return (
    <section className={styles.wrapper}>
      <ContentHeader
        title='공지사항'
        classes={classes}
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
      <NoticeContent />
    </section>
  );
}

export default Notice;
