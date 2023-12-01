import styles from './AttendanceStatBodyTd.module.css';

function AttendanceStatBodyTd({ name, profile }) {
  return (
    <tr className={styles.tr}>
      <td className={`${styles.name} ${styles.td}`}>
        <div className={styles.tdInner}>
          <img src={profile} alt='프로필' className={styles.profile} />
          {name}
        </div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>지각</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>지각</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>지각</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>지각</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>지각</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>지각</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
      <td className={styles.td}>
        <div className={styles.tdInner}>출석</div>
      </td>
    </tr>
  );
}

export default AttendanceStatBodyTd;
