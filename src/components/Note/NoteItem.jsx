import styles from "./NoteItem.module.css";

function NoteItem({ id, title, desc, date, onClick, isSelect, onChange }) {
  const handleClickCheckbox = (e) => {
    e.stopPropagation();
  };

  return (
    <li className={styles.noteItem} onClick={onClick}>
      <div className={styles.leftWrapper}>
        <input type="checkbox" className={styles.checkbox} onClick={handleClickCheckbox} checked={isSelect} onChange={() => onChange(id)} />
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.desc}>{desc}</p>
        </div>
      </div>
      <p className={styles.date}>{date}</p>
    </li>
  );
}

export default NoteItem;
