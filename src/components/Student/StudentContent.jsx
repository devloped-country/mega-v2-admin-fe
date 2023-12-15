import CourseStudentList from './CourseStudentList';
import styles from './StudentContent.module.css';
import StudentMenu from './StudentMenu';

function StudentContent({ classes, courseId, setCourseId }) {
  return (
    <section className={styles.wrapper}>
      <StudentMenu classes={classes} setCourseId={setCourseId} />
      <CourseStudentList courseId={courseId} />
    </section>
  );
}

export default StudentContent;
