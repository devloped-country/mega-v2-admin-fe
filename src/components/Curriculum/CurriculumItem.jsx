import { useState } from "react";
import styles from './CurriculumItem.module.css'
import { Navigate } from "react-router-dom";
import { useMenuBlur } from '@/hooks/useMenuBlur';
import CurriculumUpdateModal from './CurriculumUpdateModal';
import CurriculumDeleteModal from "./CurriculumDeleteModal";

function CurriculumItem({ id, subject, time, startDate, endDate, content }) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isShowingUpdateModal, setIsShowingUpdateModal] = useState(false);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const curDate = Date.now();

  const clickeButton = () => {
    setIsShowingMenu(prev => !prev);
    Navigate(`/curriculum/${id}`, {
      state: { id, subject, time, startDate, endDate, content },
    });
  };

  const menuBlurCallback = ({target}) => {
    if (target.dataset.tag !== 'curriculumMenu' && isShowingMenu) {
      setIsShowingMenu(false);
    }
  }

  useMenuBlur({ dep: [isShowingMenu], callback: menuBlurCallback });

  const handleClickMenuButton = (e) => {
    e.stopPropagation();

    if (isShowingMenu) {
      setIsShowingMenu(false);
      return;
    }

    setIsShowingMenu(true);
  };

  const handleClickUpdateButton = () => {
    setIsShowingUpdateModal(true);
    setIsShowingMenu(false);
  };

  const closeUpdateModal = () => {
    setIsShowingUpdateModal(false);
  }


  const handleClickDeleteButton = () => {
    setIsShowingDeleteModal(true);
    setIsShowingMenu(false);
  }

  const closeDeleteModal = () => {
    setIsShowingDeleteModal(false);
  }

  

  return (
    <>
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
        <p className={styles.content}>{content}</p>
      </li>
      {isShowingUpdateModal && (
        <CurriculumUpdateModal 
          title1='기본 정보 입력'
          title2='상세 정보 입력'
          onClose={closeUpdateModal}
        />
        )
      }
      {isShowingDeleteModal && (
        <CurriculumDeleteModal 
          title1='기본 정보'
          title2='상세 정보'
          onClose={closeDeleteModal}
        />
        )
      }
    </>
  );
}

export default CurriculumItem;
