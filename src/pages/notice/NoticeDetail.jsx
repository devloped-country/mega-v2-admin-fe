import NoticeMutateHeader from '@components/Notice/NoticeMutateHeader';
import styles from './NoticeDetail.module.css';
import parse from 'html-react-parser';
import { useFetch } from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '@components/common/Loading';

function NoticeDetail() {
  const { id } = useParams();

  const { data: notice, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/notice/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  if (isLoading) {
    return <Loading />;
  }

  const mapedTags = notice.data.data.tags.map(({ id, tag }) => (
    <div key={id} className={styles.tag}>
      {tag}
    </div>
  ));

  return (
    <>
      <NoticeMutateHeader type='detail' />
      <section className={styles.wrapper}>
        <header className={styles.header}>
          <h2 className={styles.title}>{notice.data.data.title}</h2>
          <div className={styles.infoWrapper}>
            <div className={styles.tags}>{mapedTags}</div>
            <ul className={styles.subInfoList}>
              <li className={styles.subInfoItem}>{notice.data.data.author}</li>
              <li className={styles.subInfoItem}>
                {notice.data.data.createdTime}
              </li>
            </ul>
          </div>
        </header>
        <div className={styles.content}>{parse(notice.data.data.content)}</div>
      </section>
    </>
  );
}

export default NoticeDetail;
