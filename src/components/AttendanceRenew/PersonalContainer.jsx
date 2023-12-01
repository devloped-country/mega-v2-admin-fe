import { useNavigate } from 'react-router-dom';
import styles from './PersonalContainer.module.css';

function PersonalContainer({ title, desc, src }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.wrapper}
      onClick={() => navigate('/attendance/profile/1')}
    >
      <img src={src} alt={title} className={styles.profile} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
}

export default PersonalContainer;
