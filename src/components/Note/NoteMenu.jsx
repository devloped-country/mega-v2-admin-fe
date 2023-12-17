import styles from "./NoteMenu.module.css";

function NoteMenu({ handleMenuClick, handleNoteSendClick }) {
  const handleButtonClick = (value) => {
    handleMenuClick(value);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.menuWrapper}>
        <div className={styles.buttonWrapper}>
          <button type="button" className={styles.button} onClick={handleNoteSendClick}>
            쪽지 쓰기
          </button>
        </div>
        <ul className={styles.menuList}>
          <li className={styles.menuItem} onClick={() => handleButtonClick("receive")}>
            <div className={styles.menuTitle}>
              <img src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-clock-five-7602640 1.svg`} alt="수신 쪽지함" />
              수신 쪽지함
            </div>
          </li>
          <li className={styles.menuItem} onClick={() => handleButtonClick("send")}>
            <div className={styles.menuTitle}>
              <img src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-calendar-check-7602580.svg`} alt="발신 쪽지함" />
              발신 쪽지함
            </div>
          </li>
          <li className={styles.menuItem} onClick={() => handleButtonClick("trash")}>
            <img src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-calendar-exclamation-7602584.svg`} alt="휴지통" />
            휴지통
          </li>
        </ul>
      </div>
    </section>
  );
}

export default NoteMenu;
