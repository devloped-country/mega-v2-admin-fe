import styles from './CurriculumContent.module.css';
import CurriculumItem from './CurriculumItem';
import { v4 as uuidv4 } from 'uuid';

function CurriculumContent() {
  return (
    <section className={styles.wrapper}>
      <ol className={styles.curriculumList}>
        <CurriculumItem 
          id={uuidv4()}
          subject='리눅스 시스템 이해하기'
          time='35h'
          startDate='2023.05.25'
          endDate='2023.06.01'
          content='운영체제 및 서버 이해/리눅스 기초 명령 활용하기/3Tier 아키텍처 구성'
        />
        <CurriculumItem 
          id={uuidv4()}
          subject='2차 프로젝트'
          time='70h'
          startDate='2023.11.20'
          endDate='2023.12.18'
          content='운영체제 및 서버 이해/리눅스 기초 명령 활용하기/3Tier 아키텍처 구성'
        />
        <CurriculumItem 
          id={uuidv4()}
          subject='리눅스 시스템 이해하기'
          time='35h'
          startDate='2023.05.25'
          endDate='2023.06.01'
          content='운영체제 및 서버 이해/리눅스 기초 명령 활용하기/3Tier 아키텍처 구성'
        />
        <CurriculumItem 
          id={uuidv4()}
          subject='리눅스 시스템 이해하기'
          time='35h'
          startDate='2023.05.25'
          endDate='2023.06.01'
          content='운영체제 및 서버 이해/리눅스 기초 명령 활용하기/3Tier 아키텍처 구성'
        />
        
      </ol>
    </section>
  );
}

export default CurriculumContent;