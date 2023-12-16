import { useState } from 'react';
import Badge from '@components/common/Badge';
import styles from './Schedule.module.css';
import { useMenuBlur } from '@/hooks/useMenuBlur';
import axios from 'axios';
import { useMutation } from '@/hooks/useMutation';

function Schedule({
  title,
  attendance,
  status,
  refetch,
  date,
  time,
  type,
  text,
}) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);

  const menuBlurCallback = ({ target }) => {
    if (target.dataset.tag !== 'scheduleMenu' && isShowingMenu) {
      setIsShowingMenu(false);
    }
  };

  useMenuBlur({ dep: [isShowingMenu], callback: menuBlurCallback });

  const handleClickMenuButton = () => {
    setIsShowingMenu(!isShowingMenu);
  };

  const { mutate: approveMutate } = useMutation(
    async (params) =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/attendance/AttendanceChangeYesRequest`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'put',
        data: params,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: unApproveMutate } = useMutation(
    async (params) =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/attendance/AttendanceChangeNoRequest`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'put',
        data: params,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const onApprove = () => {
    approveMutate({
      attendanceId: attendance,
      status,
    });
  };

  const onUnapproved = () => {
    unApproveMutate({
      attendanceId: attendance,
    });
  };

  return (
    <li className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{date}</p>
        {time && <p className={styles.time}>{time}</p>}
        <Badge type={type} text={text} />
      </div>
      <button
        type='button'
        className={styles.button}
        data-tag='scheduleMenu'
        onClick={handleClickMenuButton}
      >
        <img
          src={`${
            import.meta.env.VITE_CLOUD_FRONT_ID
          }/free-icon-font-menu-dots-vertical-3917158+1.svg`}
          data-tag='scheduleMenu'
          alt='공지사항 버튼'
        />
        {isShowingMenu && (
          <ul className={styles.menuList} data-tag='scheduleMenu'>
            <li
              className={styles.menuItem}
              data-tag='scheduleMenu'
              onClick={onApprove}
            >
              승인
            </li>
            <li
              className={styles.menuItem}
              data-tag='noticeMenu'
              onClick={onUnapproved}
            >
              미승인
            </li>
          </ul>
        )}
      </button>
    </li>
  );
}

export default Schedule;
