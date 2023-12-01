import { useState } from 'react';
import styles from './NoticeItem.module.css';
import { useMenuBlur } from '@/hooks/useMenuBlur';
import { useMutation } from '@/hooks/useMutation';
import NoticeModal from './NoticeModal';
import { useNavigate } from 'react-router';
import axios from 'axios';

function NoticeItem({
  id,
  title,
  author,
  date,
  content,
  tags,
  textContent,
  refetch,
}) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useMutation(
    async (id) => await axios({ url: `/api/notice/${id}`, method: 'delete' }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        setIsShowingModal(false);
      },
    }
  );

  const menuBlurCallback = ({ target }) => {
    if (target.dataset.tag !== 'noticeMenu' && isShowingMenu) {
      setIsShowingMenu(false);
    }
  };

  useMenuBlur({ dep: [isShowingMenu], callback: menuBlurCallback });

  const handleClickNotice = () => {
    navigate(`/notice/${id}`, {
      state: { id, title, author, date, content, tags },
    });
  };

  const handleClickMenuButton = (e) => {
    e.stopPropagation();

    if (isShowingMenu) {
      setIsShowingMenu(false);
      return;
    }

    setIsShowingMenu(true);
  };

  const handleClickUpdateButton = () => {
    navigate(`/notice/edit/${id}`);
  };

  const handleClickDeleteButton = () => {
    setIsShowingModal(true);
    setIsShowingMenu(false);
  };

  const closeModal = () => {
    setIsShowingModal(false);
  };

  const actionModal = () => {
    mutate(id);
  };

  const mapedTags = tags.map(({ id, tag }) => (
    <div className={styles.tag} key={id}>
      {tag}
    </div>
  ));

  return (
    <>
      <li className={styles.item} onClick={handleClickNotice}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            type='button'
            className={styles.button}
            onClick={handleClickMenuButton}
            data-tag='noticeMenu'
          >
            <img
              src={`${
                import.meta.env.VITE_CLOUD_FRONT_ID
              }/free-icon-font-menu-dots-vertical-3917158+1.svg`}
              data-tag='noticeMenu'
              alt='공지사항 버튼'
            />
            {isShowingMenu && (
              <ul className={styles.menuList} data-tag='noticeMenu'>
                <li
                  className={styles.menuItem}
                  data-tag='noticeMenu'
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
          <li>{author}</li>
          <li>{date}</li>
        </ul>
        <p className={styles.content}>{textContent}</p>
        <footer className={styles.footer}>{mapedTags}</footer>
      </li>
      {isShowingModal && (
        <NoticeModal
          title='공지사항 삭제 알림'
          desc='해당 공지사항을 삭제하시겠어요?'
          onClose={closeModal}
          onAction={actionModal}
          id={id}
        />
      )}
    </>
  );
}

export default NoticeItem;
