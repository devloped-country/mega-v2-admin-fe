import { useNoticeSave } from '@/hooks/useNoticeSave';
import parse from 'html-react-parser';
import styles from './NoticePreview.module.css';

function NoticePreview() {
  const { content, title, tags } = useNoticeSave();

  const mapedTags = tags.map((tag) => (
    <div className={styles.tag} key={tag.id}>
      {tag.tag}
    </div>
  ));

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{parse(content)}</div>
      <div className={styles.tags}>{mapedTags}</div>
    </section>
  );
}

export default NoticePreview;
