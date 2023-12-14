import styles from './NoticeContent.module.css';
import NoticeItem from './NoticeItem';
import NoticePagination from './NoticePagination';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import ContentLoading from '@components/common/ContentLoading';
import { useSearchParams } from 'react-router-dom';

function NoticeContent({ courseId }) {
  const [queryParams] = useSearchParams();

  const DISPLAY_PAGE_NUM = 5;
  const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 0;
  const size = queryParams.get('size') ? parseInt(queryParams.get('size')) : 10;

  const {
    data: notices,
    isLoading,
    refetch,
  } = useFetch(
    [page, courseId],
    async () =>
      await axios({
        url: `/api/notice/notices/${courseId}?page=${page}&size=${size}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  if (isLoading || !notices || !notices.data.data.content.length) {
    return <ContentLoading />;
  }

  const mapedNotice = notices.data.data.content.map(
    ({ id, title, author, content, date, tags, textContent }) => {
      return (
        <NoticeItem
          key={id}
          id={id}
          courseId={courseId}
          title={title}
          author={author}
          content={content}
          textContent={textContent}
          date={date}
          tags={tags}
          refetch={refetch}
        />
      );
    }
  );

  return (
    <section className={styles.wrapper}>
      <ol className={styles.noticeList}>{mapedNotice}</ol>
      <NoticePagination
        startPage={page - (page % DISPLAY_PAGE_NUM) + 1}
        endPage={page - (page % DISPLAY_PAGE_NUM) + 1 + DISPLAY_PAGE_NUM}
        totalPage={notices.data.data.totalPages}
        currentPage={page}
        displayPageNum={DISPLAY_PAGE_NUM}
        size={size}
      />
    </section>
  );
}

export default NoticeContent;
