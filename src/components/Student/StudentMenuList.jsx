import styles from './StudentMenuList.module.css';

function StudentMenuList({ title, courseId, setCourseId }) {
  return (
    <>
      <h2 className={styles.title} onClick={() => setCourseId(courseId)}>
        <div className={styles.titleInner}>{title}</div>
      </h2>
    </>
  );
}

export default StudentMenuList;
