import styles from "./NoteSearchMenu.module.css";
import React, { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";

function NoteSearchMenu({ selectedIds, setSelectedIds }) {
  const { data, isLoading } = useFetch([], async () => await axios("/api/note/receivers")); //수신자

  const handleCheckboxChange = (id) => {
    // 기존 선택 상태 토글 로직
    setSelectedIds((prevSelectedIds) => {
      const isSelected = prevSelectedIds.includes(id);
      return isSelected ? prevSelectedIds.filter((selectedId) => selectedId !== id) : [...prevSelectedIds, id];
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.search}>
          <img src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/free-icon-font-search-3917754 1.svg`} alt="검색" />
          <input type="text" className={styles.input} placeholder="받는사람" />
        </div>
      </div>
      <ul className={styles.searchList}>
        {data &&
          data.map(({ id, name, email }) => {
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
            </li>;
          })}
      </ul>
    </section>
  );
}

export default NoteSearchMenu;
