import { useState } from 'react';
import styles from './ContentHeader.module.css';
import { useMenuBlur } from '@/hooks/useMenuBlur';
import Button from './Button';

function ContentHeader({
  title,
  img,
  classes,
  buttonText,
  buttonImg,
  isShowingButton,
  onButtonAction,
}) {
  const [isShowingSelect, setIsShowingSelect] = useState(false);
  const [selectedClassName, setSelectedClassName] = useState(
    classes && classes[0].name
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

  const handleClickOption = ({ name }) => {
    setSelectedClassName(name);
    setIsShowingSelect(false);
    setSelected(false);
  };

  const mapedClasses =
    classes &&
    classes.map((v, i) => (
      <li
        key={i}
        className={styles.option}
        data-tag='classSelect'
        onClick={() => handleClickOption(v)}
      >
        {v.name}
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
                  src={`${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-angle-small-down-3916864+1.svg`}
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
      {isShowingButton && (
        <Button text={buttonText} img={buttonImg} onAction={onButtonAction} />
      )}
    </header>
  );
}

export default ContentHeader;
