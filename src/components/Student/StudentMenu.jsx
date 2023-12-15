import styles from './StudentMenu.module.css';
import StudentMenuList from './StudentMenuList';

function StudentMenu({ classes, setCourseId }) {
  const mapedClasses = classes.map(([courseId, course]) => {
    return (
      <StudentMenuList
        key={courseId}
        courseId={courseId}
        title={course}
        setCourseId={setCourseId}
      />
    );
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.course}>과정명</div>
      {mapedClasses}
    </section>
  );
}

export default StudentMenu;
