import { useNavigate } from 'react-router-dom';
import styles from './NoticePagination.module.css';

function NoticePagination({
  startPage,
  endPage,
  totalPage,
  currentPage,
  size,
}) {
  const navigate = useNavigate();
  let pages = [];
  for (
    let i = startPage;
    i <= (endPage - 1 > totalPage ? totalPage : endPage - 1);
    i++
  ) {
    pages.push(i);
  }

  const handleClickPagination = (number) =>
    navigate(`/notice?page=${number}&size=${size}`);

  const mapedPages = pages.map((page) => (
    <li
      key={page}
      className={`${styles.paginationItem} ${
        currentPage === page - 1 && styles.active
      }`}
      onClick={() => navigate(`/notice?page=${page - 1}&size=${size}`)}
    >
      {page}
    </li>
  ));

  return (
    <ul className={styles.paginationList}>
      <li
        className={styles.paginationItem}
        onClick={() => handleClickPagination(0)}
      >
        <img
          src={`${
            import.meta.env.VITE_CLOUD_FRONT_ID
          }/angle-double-small-left+(2)+2.svg`}
          alt='처음으로'
        />
      </li>
      <li
        className={styles.paginationItem}
        onClick={() => {
          if (currentPage > 0) handleClickPagination(currentPage - 1);
        }}
      >
        <img
          src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/angle-small-left+5.svg`}
          alt='이전으로'
        />
      </li>
      {mapedPages}
      <li
        className={styles.paginationItem}
        onClick={() => {
          if (currentPage < totalPage - 1)
            handleClickPagination(currentPage + 1);
        }}
      >
        <img
          src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/angle-small-right+4.svg`}
          alt='다음으로'
        />
      </li>
      <li
        className={styles.paginationItem}
        onClick={() => handleClickPagination(totalPage - 1)}
      >
        <img
          src={`${
            import.meta.env.VITE_CLOUD_FRONT_ID
          }/angle-double-small-right+(2)+1.svg`}
          alt='마지막으로'
        />
      </li>
    </ul>
  );
}

export default NoticePagination;
