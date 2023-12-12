import { useState } from "react";
import styles from './CurriculumItem.module.css'
import { Navigate, useFetcher, useNavigate } from "react-router-dom";
import { useMenuBlur } from '@/hooks/useMenuBlur';
import CurriculumUpdateModal from './CurriculumUpdateModal';
import CurriculumDeleteModal from "./CurriculumDeleteModal";
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

function CurriculumItem({ id, subject, time, curriculumId, startDate, endDate, contents, onClick }) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isShowingUpdateModal, setIsShowingUpdateModal] = useState(false);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);
  const navigate = useNavigate();

  const start = new Date(startDate);
  const end = new Date(endDate);
  const curDate = Date.now();

  const clickeButton = () => {
    setIsShowingMenu(prev => !prev);
    navigate(`/curriculum/${id}`, {
      state: { id, subject, time, startDate, endDate, contents },
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
    onClick(id);
  }

  const closeDeleteModal = () => {
    setIsShowingDeleteModal(false);
  }


  const mapedContent = contents.map(
    ({content}, index) => {
      return (
        <div key={index}
        > {content}  /</div>
      )
    }
  )


  id = 2;
  const {
    data: curriculum,
    isLoading
  } = useFetch(
    [],
    async () => await axios(`/api/curriculum/read/${id}`)
  );

  if(isLoading) {
    return 
  }
  

  console.log(curriculum.data.data)
  const mapedUpdateSubject = curriculum.data.data.map(
    ({curriculum_id, subject, time, startDate, endDate, content}) => {
      return (
        <CurriculumUpdateModal 
          key={curriculum_id}
          id={curriculum_id}
          subject={subject}
          time={time}
          startDate={startDate}
          endDate={endDate}
          contents={content}
          title1='기본 정보'
          title2='상세 정보'
          onClose={closeUpdateModal}
        />
      )
    }
  )

  const mapedDeleteSubject = curriculum.data.data.map(
    ({curriculum_id, subject, time, startDate, endDate, content}) => {
      console.log(curriculum_id)
      return (
        <CurriculumDeleteModal 
          key={curriculum_id}
          id={curriculum_id}
          curriculumId={curriculumId}
          subject={subject}
          time={time}
          startDate={startDate}
          endDate={endDate}
          contents={content}
          title1='기본 정보'
          title2='상세 정보'
          onClose={closeDeleteModal}
        />
      )
    }
  )
  

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
        <p className={styles.content}>{mapedContent}</p>
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
          onClose={closeUpdateModal}
        />
        )
      }
    </>
  );
}

export default CurriculumItem;
