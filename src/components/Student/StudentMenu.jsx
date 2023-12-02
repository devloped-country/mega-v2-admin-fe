import styles from './StudentMenu.module.css';
import StudentMenuList from './StudentMenuList';

function StudentMenu() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.course}>과정명</div>
      <StudentMenuList
        title='클라우드 네이티브 애플리케이션 개발자 양성과정'
        count='14'
      />
      <StudentMenuList title='클라우드 엔지니어 전문가 양성과정' count='27' />
    </section>
  );
}

export default StudentMenu;
