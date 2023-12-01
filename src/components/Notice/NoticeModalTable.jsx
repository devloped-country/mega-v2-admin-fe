import styles from './NoticeModalTable.module.css';

function NoticeModalTable({ title, desc, author, date }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHead}>
          <th className={`${styles.tableHeadCol} ${styles.tableTitle}`}>
            제목
          </th>
          <th className={`${styles.tableHeadCol} ${styles.tableDesc}`}>내용</th>
          <th className={`${styles.tableHeadCol} ${styles.tableAuthor}`}>
            작성자
          </th>
          <th className={`${styles.tableHeadCol} ${styles.tableDate}`}>
            작성일
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={`${styles.tableCol} ${styles.tableTitle}`}>
            <div className={styles.cell}>{title}</div>
          </td>
          <td className={`${styles.tableCol} ${styles.tableDesc}`}>
            <div className={styles.cell}>{desc}</div>
          </td>
          <td className={`${styles.tableCol} ${styles.tableAuthor}`}>
            <div className={styles.cell}>{author}</div>
          </td>
          <td className={`${styles.tableCol} ${styles.tableDate}`}>
            <div className={styles.cell}>{date}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default NoticeModalTable;
