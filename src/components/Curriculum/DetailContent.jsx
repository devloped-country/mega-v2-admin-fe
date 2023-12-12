import { useState } from 'react';
import styles from './DetailContent.module.css';

function DetailContent({placeholder, onDelete, index, src}) {

  const [contents, setContents] = useState('');

  const handleDeleteInput = () => {
    onDelete(index);
  }
  
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
        src={src}
        className={styles.deleteInput}
        onClick={(handleDeleteInput)}
      />
    </div>
  );
}

export default DetailContent;