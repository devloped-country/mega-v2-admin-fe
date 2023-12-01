import ContentHeader from '@components/common/ContentHeader';
import { useState } from 'react';
import DashBoardContent from '@components/DashBoard/DashBoardContent';
import styles from './DashBoard.module.css';

export default function Home() {
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);

  return (
    <>
      <ContentHeader
        title='홈'
        classes={classes}
        img={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-home-3917033 1.svg`}
        isShowingButton={false}
      />
      <DashBoardContent />
    </>
  );
}
