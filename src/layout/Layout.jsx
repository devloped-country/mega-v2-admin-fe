import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <img
            src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/logo.svg`}
            alt='로고'
          />
          메가존 클라우드
        </h2>
        <div className={styles.headerSearchWrapper}>
          <img
            src={`${
              import.meta.env.VITE_CLOUD_FRONT_ID
            }/free-icon-font-search-3917754 1.svg`}
            alt='검색'
          />
          <input
            type='text'
            placeholder='교육생 검색'
            className={styles.headerSearch}
          />
        </div>
        <div>
          <img
            src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/profile.svg`}
            alt='프로필'
          />
        </div>
      </header>
      <section className={styles.contentWrapper}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to='/' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-home-3917033 1.svg`}
                  alt='홈'
                />
                홈
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/notice' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-megaphone-3914404 1.svg`}
                  alt='공지사항'
                />
                공지사항
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/curriculum' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-clipboard-list-7857307 1.svg`}
                  alt='커리큘럼'
                />
                커리큘럼
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/students' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-users-3914353 1.svg`}
                  alt='교육생'
                />
                교육생
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/attendance' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-user-time-3914150 1.svg`}
                  alt='출결'
                />
                출결
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/qr' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-qr-scan-12436470 1.svg`}
                  alt='QR'
                />
                QR
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/note' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-paper-plane-3917567 2.svg`}
                  alt='쪽지'
                />
                쪽지
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/setting' className={styles.navLink}>
                <img
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-settings-3917058 1.svg`}
                  alt='설정'
                />
                설정
              </Link>
            </li>
          </ul>
        </nav>
        <section className={styles.main}>
          <Outlet />
        </section>
      </section>
    </section>
  );
}
