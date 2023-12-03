import { useState } from 'react';
import styles from './CourseStudentList.module.css';
import Badge from '@components/common/Badge';
import { useMenuBlur } from '@/hooks/useMenuBlur';
import { useNavigate } from 'react-router-dom';
import StudentUpdateModal from './StudentUpdateModal';
import StudentRemoveModal from './StudentRemoveModal';

function CourseStudentList() {
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isShowingUpdateModal, setIsShowingUpdateModal] = useState(false);
  const [isShowingRemoveModal, setIsShowingRemoveModal] = useState(false);
  const navigate = useNavigate();

  const handleClickMenuButton = (e) => {
    e.stopPropagation();
    setIsShowingMenu(true);
  };

  const menuBlurCallback = ({ target }) => {
    if (target.dataset.tag !== 'studentMenu' && isShowingMenu) {
      setIsShowingMenu(false);
    }
  };

  useMenuBlur({ dep: [isShowingMenu], callback: menuBlurCallback });

  const handleClickStudent = () => {
    navigate('/attendance/profile/1');
  };

  const handleClickUpdateButton = (e) => {
    e.stopPropagation();
    setIsShowingUpdateModal(true);
    setIsShowingMenu(false);
  };

  const handleClickDeleteButton = (e) => {
    e.stopPropagation();
    setIsShowingRemoveModal(true);
    setIsShowingMenu(false);
  };

  const handleClickUpadteCancelModalButton = () => {
    setIsShowingUpdateModal(false);
  };

  const handleClickRemoveCancelModalButton = () => {
    setIsShowingRemoveModal(false);
  };

  return (
    <>
      <section className={styles.wrapper}>
        <ul className={styles.studentList}>
          <li className={styles.studentItem} onClick={handleClickStudent}>
            <div className={styles.studentItemLeft}>
              <img
                src='https://mblogthumb-phinf.pstatic.net/MjAyMTEyMzFfMTYw/MDAxNjQwOTMyNjEyMjU4.0CtqFXmwxPTP73-1814Z6CqNeDsuWKCWOptcbDqvFj0g.pW71_YTc7CpVvwZ4_6bbfzp8YvK4WnfiKecXYl4zlBEg.PNG.moonskinz/%EB%AC%B8%EB%94%94%EC%9E%90%EC%9D%B8_%EB%94%94%EC%8A%A4%EC%BD%94%EB%93%9C_%285%29.png?type=w420'
                alt='프로필'
                className={styles.profile}
              />
              <h3 className={styles.name}>김유범</h3>
              <div className={styles.info}>
                <p className={styles.infoText}>
                  클라우드 네이티브 애플리케이션 개발 양성 과정
                </p>
                <p className={styles.infoText}>010-1234-5678</p>
                <p className={styles.infoText}>kimub1234@naver.com</p>
              </div>
              <Badge type='blue' text='가입 완료' />
            </div>
            <button
              type='button'
              className={styles.button}
              onClick={handleClickMenuButton}
              data-tag='studentMenu'
            >
              <img
                src={`${
                  import.meta.env.VITE_CLOUD_FRONT_ID
                }/free-icon-font-menu-dots-vertical-3917158+1.svg`}
                data-tag='studentMenu'
                alt='메뉴'
              />
              {isShowingMenu && (
                <ul className={styles.menuList} data-tag='studentMenu'>
                  <li
                    className={styles.menuItem}
                    data-tag='studentMenu'
                    onClick={handleClickUpdateButton}
                  >
                    수정
                  </li>
                  <li
                    className={styles.menuItem}
                    data-tag='studentMenu'
                    onClick={handleClickDeleteButton}
                  >
                    삭제
                  </li>
                </ul>
              )}
            </button>
          </li>
        </ul>
      </section>
      {isShowingUpdateModal && (
        <StudentUpdateModal
          title='교육생 초대 수정'
          onClose={handleClickUpadteCancelModalButton}
        />
      )}
      {isShowingRemoveModal && (
        <StudentRemoveModal
          title='교육생 삭제 알림'
          desc='해당 교육생 초대를 삭제하시겠어요?'
          onClose={handleClickRemoveCancelModalButton}
        />
      )}
    </>
  );
}

export default CourseStudentList;
