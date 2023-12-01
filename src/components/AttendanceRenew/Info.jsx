import styles from './Info.module.css';

function Info({ term, definition }) {
  return (
    <dl className={styles.infoList}>
      <dt className={styles.infoTerm}>{term}</dt>
      <dd className={styles.infoDefinition}>{definition}</dd>
    </dl>
  );
}

export default Info;
