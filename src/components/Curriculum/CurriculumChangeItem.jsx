import { useState } from 'react';
import styles from './CurriculumChangeItem.module.css';
import ReactDragList from 'react-drag-list';

function CurriculumChangeItem({id, subject, courseId, time, curriuclumId, startDate, endDate, contents }) {

  const start = new Date(startDate);
  const end = new Date(endDate);
  const curDate = Date.now();

  const mapedContent = contents.map(({ content }, index) => {
    return <div key={index}>&nbsp;{content}&nbsp;/</div>;
  });

  //-----------------------------------------------
  const [itemList, setItemList] = useState(false);

  const handleUpdate = (evt, updated) => {
    // console.log(evt); // tslint:disable-line
    // console.log(updated); // tslint:disable-line
    setItemList([...updated]);
  };

  const dragList = (record, index) => {
    return(
      <li key={index} className={styles.item}>
        <div className={styles.handles}>
          <span class="rc-draggable-list-handles">☰</span>
        </div>
        <div>
          <header className={styles.header}>
            <div className={styles.textAlign}>
              {start - curDate < 0 && end - curDate > 0 ? (
                <img src='https://d2f3kqq80r3o3g.cloudfront.net/Frame%20303.svg' />
              ) : (
                <img src='https://d2f3kqq80r3o3g.cloudfront.net/Frame%20304.svg' />
              )}
              <h3 className={styles.title}>{subject}</h3>
              <h3 className={styles.timePosition}>{time}h</h3>
            </div>
          </header>
          <ul className={styles.info}>
            <li>
              {startDate} ~ {endDate}
            </li>
          </ul>
          <div className={styles.content}>{mapedContent}</div>
        </div>
      </li>
    );
    
  };

  return(
    <ReactDragList
    dataSource={[{id: curriuclumId, name : subject}]}//렌더링할 데이터 레코드 배열
    rowKey='id'//렌더링할 행 키
    row={dragList}  //렌더링할 행 데이터
    handles={true} //드래그 핸들 표시
    className='simple-drag'
    rowClassName='simple-drag-row'
    onUpdate={handleUpdate} //정렬 목록이 변경될 때 호출됨
  />
  );
}

export default CurriculumChangeItem;