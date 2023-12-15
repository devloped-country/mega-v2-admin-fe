import { useState } from 'react';
import styles from './CurriculumItem.module.css';
import { useMenuBlur } from '@/hooks/useMenuBlur';

function CurriculumItem({
  id,
  subject,
  courseId,
  time,
  curriculumId,
  startDate,
  endDate,
  contents,
  onClick,
  setIsShowingDeleteModal,
  setIsShowingUpdateModal,
  refetch,
}) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const curDate = Date.now();

  const menuBlurCallback = ({ target }) => {
    if (target.dataset.tag !== 'curriculumMenu' && isShowingMenu) {
      setIsShowingMenu(false);
    }
  };

  useMenuBlur({ dep: [isShowingMenu], callback: menuBlurCallback });

  const handleClickMenuButton = (e) => {
    e.stopPropagation();

    if (isShowingMenu) {
      setIsShowingMenu(false);
      return;
    }

    setIsShowingMenu(true);
  };

  const handleClickDeleteButton = () => {
    setIsShowingDeleteModal(true);
    setIsShowingMenu(false);
    onClick(id);
  };

  const handleClickUpdateButton = () => {
    setIsShowingUpdateModal(true);
    setIsShowingMenu(false);
    onClick(id);
  };

  const mapedContent = contents.map(({ content }, index) => {
    return <div key={index}>&nbsp;{content}&nbsp;/</div>;
  });

  return (
    <li className={styles.item}>
      <header className={styles.header}>
        <div className={styles.textAlign}>
          {start - curDate < 0 && end - curDate > 0 ? (
            <img src='https://d2f3kqq80r3o3g.cloudfront.net/Frame%20303.svg' />
          ) : (
            <img src='https://d2f3kqq80r3o3g.cloudfront.net/Frame%20304.svg' />
          )}
          <h3 className={styles.title}>{subject}</h3>
          <h3 className={styles.timePosition}>{time}</h3>
        </div>

        <button
          type='button'
          className={styles.button}
          onClick={handleClickMenuButton}
          data-tag='curriculumMenu'
        >
          <img
            src={`${
              import.meta.env.VITE_CLOUD_FRONT_ID
            }/free-icon-font-menu-dots-vertical-3917158+1.svg`}
            data-tag='curriculumMenu'
            alt='버튼'
          />
          {isShowingMenu && (
            <ul className={styles.menuList} data-tag='curriculumMenu'>
              <li
                className={styles.menuItem}
                data-tag='curriculumMenu'
                onClick={handleClickUpdateButton}
              >
                수정
              </li>
              <li
                className={styles.menuItem}
                data-tag='noticeMenu'
                onClick={handleClickDeleteButton}
              >
                삭제
              </li>
            </ul>
          )}
        </button>
      </header>
      <ul className={styles.info}>
        <li>
          {startDate} ~ {endDate}
        </li>
      </ul>
      <div className={styles.content}>{mapedContent}</div>
    </li>
  );
}

export default CurriculumItem;
