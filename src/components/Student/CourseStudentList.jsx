import { useState } from 'react';
import styles from './CourseStudentList.module.css';
import Badge from '@components/common/Badge';
import { useMenuBlur } from '@/hooks/useMenuBlur';
import { useNavigate } from 'react-router-dom';
import StudentUpdateModal from './StudentUpdateModal';
import StudentRemoveModal from './StudentRemoveModal';
import { useFetch } from '@/hooks/useFetch';
import ContentLoading from '@/components/common/ContentLoading';
import axios from 'axios';

function CourseStudentList({ courseId }) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isShowingUpdateModal, setIsShowingUpdateModal] = useState(false);
  const [isShowingRemoveModal, setIsShowingRemoveModal] = useState(false);
  const navigate = useNavigate();

  const menuBlurCallback = ({ target }) => {
    if (target.dataset.tag !== 'studentMenu' && isShowingMenu) {
      setIsShowingMenu(false);
    }
  };

  useMenuBlur({ dep: [isShowingMenu], callback: menuBlurCallback });

  const { data, isLoading } = useFetch(
    [courseId],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/user/course/${courseId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

  if (isLoading) {
    return (
      <section className={styles.wrapper}>
        <ContentLoading />
      </section>
    );
  }
  const handleClickMenuButton = (e) => {
    e.stopPropagation();
    setIsShowingMenu(true);
  };

  const handleClickStudent = (id) => {
    navigate(`/attendance/profile/${id}`);
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

  const mapedData = data.data.data.map(
    ({ id, name, email, phone, isSigned }) => {
      return (
        <li
          key={id}
          className={styles.studentItem}
          onClick={() => handleClickStudent(id)}
        >
          <div className={styles.studentItemLeft}>
            <img
              src='https://mblogthumb-phinf.pstatic.net/MjAyMTEyMzFfMTYw/MDAxNjQwOTMyNjEyMjU4.0CtqFXmwxPTP73-1814Z6CqNeDsuWKCWOptcbDqvFj0g.pW71_YTc7CpVvwZ4_6bbfzp8YvK4WnfiKecXYl4zlBEg.PNG.moonskinz/%EB%AC%B8%EB%94%94%EC%9E%90%EC%9D%B8_%EB%94%94%EC%8A%A4%EC%BD%94%EB%93%9C_%285%29.png?type=w420'
              alt='프로필'
              className={styles.profile}
            />
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.info}>
              <p className={styles.infoText}>{phone}</p>
              <p className={styles.infoText}>{email}</p>
            </div>
            {isSigned ? (
              <Badge type='blue' text='가입 완료' />
            ) : (
              <Badge type='green' text='초대 중' />
            )}
          </div>
          {/* <button
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
          </button> */}
        </li>
      );
    }
  );

  return (
    <>
      <section className={styles.wrapper}>
        <ul className={styles.studentList}>{mapedData}</ul>
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
