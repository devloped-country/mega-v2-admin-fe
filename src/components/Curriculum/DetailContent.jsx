import styles from './DetailContent.module.css';

function DetailContent({placeholder, contents, setContents, handleDeleteInput, index}) {

  return (
    <div className={styles.buttonPosition}>
      <input
        type='text'
        placeholder={placeholder}
        className={styles.AddDetailInput}
        value={contents}
          onChange={(e) => setContents(e.target.value)}
      />
      <img 
        src="https://d2f3kqq80r3o3g.cloudfront.net/GreyDeleteDetailButton.svg"
        className={styles.deleteInput}
        onClick={() => handleDeleteInput()}
      />
    </div>
  );
}

export default DetailContent;