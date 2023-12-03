import styles from './NoteSearchMenu.module.css';

function NoteSearchMenu() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.search}>
          <img
            src={`${
              import.meta.env.VITE_CLOUD_FRONT_ID
            }/free-icon-font-search-3917754 1.svg`}
            alt='검색'
          />
          <input type='text' className={styles.input} placeholder='받는사람' />
        </div>
      </div>
      <ul className={styles.searchList}>
        <li className={styles.searchItem}>
          <div className={styles.searchItemLeft}>
            <img
              src='https://mblogthumb-phinf.pstatic.net/MjAyMTEyMzFfMTYw/MDAxNjQwOTMyNjEyMjU4.0CtqFXmwxPTP73-1814Z6CqNeDsuWKCWOptcbDqvFj0g.pW71_YTc7CpVvwZ4_6bbfzp8YvK4WnfiKecXYl4zlBEg.PNG.moonskinz/%EB%AC%B8%EB%94%94%EC%9E%90%EC%9D%B8_%EB%94%94%EC%8A%A4%EC%BD%94%EB%93%9C_%285%29.png?type=w420'
              alt='프로필'
              className={styles.profile}
            />
            <div className={styles.info}>
              <h3 className={styles.name}>김유범</h3>
              <p className={styles.email}>kimub1234@naver.com</p>
            </div>
          </div>

          <input type='checkbox' className={styles.checkbox} />
        </li>
      </ul>
    </section>
  );
}

export default NoteSearchMenu;
