import styles from './SettingContentItem.module.css';

function SettingContentItem({ icon, title, desc, onClick }) {
  return (
    <li className={styles.settingItem} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
    </li>
  );
}

export default SettingContentItem;
