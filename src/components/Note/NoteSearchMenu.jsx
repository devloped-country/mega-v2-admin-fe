import styles from './NoteSearchMenu.module.css';
import React, { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

function NoteSearchMenu({ courseId, selectedIds, setSelectedIds }) {
  console.log(courseId.courseId);
  //수신자 정보 가져오기
  const { data, isLoading } = useFetch(
    [courseId],
    async () =>
      await axios({
        url: `https://admin.mzc-appmega.click/api/note/${courseId.courseId}/receivers`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
  );

<<<<<<< HEAD
  if (isLoading) {
    return "loading";
=======
  if (isLoading || !data.data) {
    return 'loading';
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
  }
  const handleCheckboxChange = (id) => {
    // 기존 선택 상태 토글 로직
    setSelectedIds((prevSelectedIds) => {
      const isSelected = prevSelectedIds.includes(id);
      return isSelected
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id];
    });
  };

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
<<<<<<< HEAD
        {data.data ? (
          data.data.map(({ id, name, email }) => {
            return (
              <li className={styles.searchItem} key={id}>
                <div className={styles.searchItemLeft}>
                  <img
                    src="https://mblogthumb-phinf.pstatic.net/MjAyMTEyMzFfMTYw/MDAxNjQwOTMyNjEyMjU4.0CtqFXmwxPTP73-1814Z6CqNeDsuWKCWOptcbDqvFj0g.pW71_YTc7CpVvwZ4_6bbfzp8YvK4WnfiKecXYl4zlBEg.PNG.moonskinz/%EB%AC%B8%EB%94%94%EC%9E%90%EC%9D%B8_%EB%94%94%EC%8A%A4%EC%BD%94%EB%93%9C_%285%29.png?type=w420"
                    alt="프로필"
                    className={styles.profile}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.email}>{email}</p>
                  </div>
                </div>
                <input type="checkbox" className={styles.checkbox} checked={selectedIds.includes(id)} onChange={() => handleCheckboxChange(id)} />
              </li>
            );
          })
        ) : (
          <li className={styles.searchItem}>받는사람 목록이 없습니다.</li>
        )}
=======
        {data.data.map(({ id, name, email }) => {
          return (
            <li className={styles.searchItem} key={id}>
              <div className={styles.searchItemLeft}>
                <img
                  src='https://mblogthumb-phinf.pstatic.net/MjAyMTEyMzFfMTYw/MDAxNjQwOTMyNjEyMjU4.0CtqFXmwxPTP73-1814Z6CqNeDsuWKCWOptcbDqvFj0g.pW71_YTc7CpVvwZ4_6bbfzp8YvK4WnfiKecXYl4zlBEg.PNG.moonskinz/%EB%AC%B8%EB%94%94%EC%9E%90%EC%9D%B8_%EB%94%94%EC%8A%A4%EC%BD%94%EB%93%9C_%285%29.png?type=w420'
                  alt='프로필'
                  className={styles.profile}
                />
                <div className={styles.info}>
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.email}>{email}</p>
                </div>
              </div>
              <input
                type='checkbox'
                className={styles.checkbox}
                checked={selectedIds.includes(id)}
                onChange={() => handleCheckboxChange(id)}
              />
            </li>
          );
        })}
>>>>>>> ef6830fc4127986c9dd3183f656185e34a90883b
      </ul>
    </section>
  );
}

export default NoteSearchMenu;
