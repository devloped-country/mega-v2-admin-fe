import styles from './DetailContent.module.css';

function DetailContent({
  value,
  setContents,
  placeholder,
  onDelete,
  index,
  src,
  src2,
  contents,
}) {
  const handleDeleteInput = () => {
    onDelete(index);
  };

  return (
    <div className={styles.buttonPosition}>
      <input
        type='text'
        placeholder={placeholder}
        className={styles.AddDetailInput}
        value={value}
        onChange={(e) =>
          setContents((prev) => {
            return prev.map((value) =>
              value.id === index ? { ...value, value: e.target.value } : value
            );
          })
        }
      />
      <img
        src={contents.length > 1 ? src2 : src}
        className={styles.deleteInput}
        onClick={handleDeleteInput}
      />
    </div>
  );
}

export default DetailContent;
