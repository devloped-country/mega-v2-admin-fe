import styles from './EducationPersonnelInfo.module.css';

function EducationPersonnelInfo({ title, content }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

export default EducationPersonnelInfo;
