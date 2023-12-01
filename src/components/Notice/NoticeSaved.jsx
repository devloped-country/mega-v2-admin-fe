import styles from './NoticeSaved.module.css';
import { v4 as uuidv4 } from 'uuid';

import NoticeSaveEditor from './NoticeSaveEditor';

function NoticeSaved({
  title,
  tag,
  tags,
  isShowingTitleInputValidateMessage,
  setIsShowingTitleInputValidateMessage,
  isShowingContentInputValidateMessage,
  setIsShowingTagsInputValidateMessage,
  isShowingTagsInputValidateMessage,
  setIsShowingContentInputValidateMessage,
  changeTitle,
  changeTag,
  changeTags,
}) {
  const handleChangeTitle = ({ target }) => {
    changeTitle(target.value);
    setIsShowingTitleInputValidateMessage(false);
  };

  const handleKeyDownTag = ({ key }) => {
    if (!tag.length) {
      return;
    }

    if (tags.length > 4) {
      return;
    }

    if (key === 'Enter' && tag.trim()) {
      changeTags({ id: uuidv4(), tag: `#${tag}` });
      setIsShowingTagsInputValidateMessage(false);
      changeTag('');
    }
  };

  const handleChangeTag = ({ target }) => {
    changeTag(target.value);
  };

  const handleClickTag = (id) => {
    changeTags(tags.filter((tag) => tag.id !== id));
  };

  const mapedTags = tags.map((tag) => (
    <span key={tag.id} className={styles.tag}>
      {tag.name}
      {tag.tag}
      <img
        src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/cross-small 1.svg`}
        alt='태그 삭제'
        className={styles.tagButton}
        onClick={() => handleClickTag(tag.id)}
      />
    </span>
  ));

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <input
            type='text'
            placeholder='제목을 입력해주세요'
            className={styles.inputTitle}
            value={title}
            onChange={handleChangeTitle}
            maxLength={100}
          />
          {isShowingTitleInputValidateMessage && (
            <div className={styles.titleValdiateMessage}>
              제목을 입력해주세요.
            </div>
          )}
        </div>
        <div className={styles.contentWrapper}>
          <NoticeSaveEditor
            setIsShowingContentInputValidateMessage={
              setIsShowingContentInputValidateMessage
            }
          />
          {isShowingContentInputValidateMessage && (
            <div className={styles.contentValdiateMessage}>
              내용을 입력해주세요.
            </div>
          )}
        </div>
        <div className={styles.tagWrapper}>
          <input
            type='text'
            placeholder='태그를 입력해주세요.'
            className={styles.inputTag}
            value={tag}
            onChange={handleChangeTag}
            onKeyDown={handleKeyDownTag}
            maxLength={10}
          />
          {isShowingTagsInputValidateMessage && (
            <div className={styles.tagsValdiateMessage}>
              태그를 입력해주세요.
            </div>
          )}
        </div>
        <div className={styles.tags}>{mapedTags}</div>
      </header>
    </section>
  );
}

export default NoticeSaved;
