import { useState } from "react";
import Badge from "@components/common/Badge";
import styles from "./Schedule.module.css";
import { useMenuBlur } from "@/hooks/useMenuBlur";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";
import ContentLoading from "@components/common/ContentLoading";

function Schedule({ title, date, time, type, text }) {
  const [isShowingMenu, setIsShowingMenu] = useState(false);

  const id = 1;

  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: `/api/attendacne/${id}/
  getAppliancesById`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  );

  useMenuBlur({ dep: [isShowingMenu], callback: menuBlurCallback });

  if (isLoading) {
    return <ContentLoading />;
  }

  const menuBlurCallback = ({ target }) => {
    if (target.dataset.tag !== "scheduleMenu" && isShowingMenu) {
      setIsShowingMenu(false);
    }
  };

  const handleClickMenuButton = () => {
    setIsShowingMenu(!isShowingMenu);
  };

  return (
    <li className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{date}</p>
        {time && <p className={styles.time}>{time}</p>}
        <Badge type={type} text={text} />
      </div>
      <button type="button" className={styles.button} data-tag="scheduleMenu" onClick={handleClickMenuButton}>
        <img src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-menu-dots-vertical-3917158+1.svg`} data-tag="scheduleMenu" alt="공지사항 버튼" />
        {isShowingMenu && (
          <ul className={styles.menuList} data-tag="scheduleMenu">
            <li className={styles.menuItem} data-tag="scheduleMenu">
              승인
            </li>
            <li
              className={styles.menuItem}
              data-tag="noticeMenu"
              // onClick={handleClickDeleteButton}
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
