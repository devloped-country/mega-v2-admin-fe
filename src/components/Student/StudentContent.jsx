import CourseStudentList from './CourseStudentList';
import styles from './StudentContent.module.css';
import StudentMenu from './StudentMenu';

function StudentContent() {
  return (
    <section className={styles.wrapper}>
      <StudentMenu />
      <CourseStudentList />
    </section>
  );
}

export default StudentContent;
