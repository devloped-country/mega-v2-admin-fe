import { useState } from 'react';
import styles from './AttendanceRenew.module.css';
import ContentHeader from '@components/common/ContentHeader';
import AttendanceContent from '@components/AttendanceRenew/AttendanceContent';

function AttendanceRenew() {
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);

  const handleClickPrintButton = () => {
    console.log('프린트');
  };

  return (
    <section className={styles.wrapper}>
      <ContentHeader
        title='출결'
        classes={classes}
        img={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-user-time-3914150 1.svg`}
        buttonImg={`${import.meta.env.VITE_CLOUD_FRONT_ID}/print 1.svg`}
        buttonText='인쇄하기'
        isShowingButton={true}
        onButtonAction={handleClickPrintButton}
      />
      <AttendanceContent />
    </section>
  );
}

export default AttendanceRenew;
