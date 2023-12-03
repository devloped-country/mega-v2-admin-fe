import { useState } from 'react';
import styles from './StudentMenuList.module.css';

function StudentMenuList({ title, count }) {
  return (
    <>
      <h2 className={styles.title}>
        <div className={styles.titleInner}>{title}</div>
        <div className={styles.studentCount}>{count}</div>
      </h2>
    </>
  );
}

export default StudentMenuList;
