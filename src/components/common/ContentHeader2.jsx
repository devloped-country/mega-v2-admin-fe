import { useState } from 'react';
import styles from './ContentHeader.module.css';
import { useMenuBlur } from '@/hooks/useMenuBlur';
import Button from './Button';

function ContentHeader2({
  title,
  img,
  classes,
  buttonImg,
  buttonText,
  buttonImg2,
  buttonText2,
  isShowingButton,
  isShowingButton2,
  onButtonAction1,
  onButtonAction2,
  setCourseId,
}) {
  const [isShowingSelect, setIsShowingSelect] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState(
    classes && classes[0][1]
  );
  const [selected, setSelected] = useState(false);

  const menuBlurCallback = ({ target }) => {
    if (target.dataset.tag !== 'classSelect' && isShowingSelect) {
      setIsShowingSelect(false);
      setSelected(false);
    }
  };

  useMenuBlur({ dep: [isShowingSelect], callback: menuBlurCallback });

  const handleClickSelect = () => {
    setSelected(true);
    setIsShowingSelect(true);
  };

  const handleClickOption = (selectOption) => {
    setSelectedClassName(selectOption[1]);
    setCourseId(selectOption[0]);
    setIsShowingSelect(false);
    setSelected(false);
  };

  const mapedClasses =
    classes &&
    classes.map((v) => (
      <li
        key={v[0]}
        className={styles.option}
        data-tag='classSelect'
        onClick={() => handleClickOption(v)}
      >
        {v[1]}
      </li>
    ));

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <img src={img} alt={title} className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
        {classes && (
          <div className={styles.selectWrapper}>
            <button
              name='class'
              className={styles.select}
              data-tag='classSelect'
              onClick={handleClickSelect}
              type='button'
            >
              <p className={styles.selectPlaceholder} data-tag='classSelect'>
                {selectedClassName}
              </p>
              <span
                className={`${styles.selectArrow} ${
                  selected && styles.selectArrowActive
                }`}
                data-tag='classSelect'
              >
                <img
                  src='https://d2f3kqq80r3o3g.cloudfront.net/free-icon-font-angle-small-down-3916864+1.svg'
                  alt='화살표'
                  data-tag='classSelect'
                />
              </span>
            </button>

            {isShowingSelect && (
              <ul className={styles.optionWrapper} data-tag='classSelect'>
                {mapedClasses}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className={styles.buttonAlign}>
        <div className={styles.statePosition}>
          <img
            src='https://d2f3kqq80r3o3g.cloudfront.net/Frame%20303.svg'
            className={styles.stateMargin}
          />
          진행중
          <img
            src='https://d2f3kqq80r3o3g.cloudfront.net/Frame%20304.svg'
            className={styles.stateMargin}
          />
          예정
        </div>
        {isShowingButton && (
          <Button
            text={buttonText}
            img={buttonImg}
            onAction={onButtonAction1}
          />
        )}
        {isShowingButton2 && (
          <Button
            text={buttonText2}
            img={buttonImg2}
            onAction={onButtonAction2}
          />
        )}
      </div>
    </header>
  );
}

export default ContentHeader2;
