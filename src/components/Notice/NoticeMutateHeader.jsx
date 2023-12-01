import ModalButton from '@components/common/ModalButton';
import styles from './NoticeMutateHeader.module.css';
import { useNavigate } from 'react-router-dom';
import { useNoticeSave } from '@/hooks/useNoticeSave';

function NoticeMutateHeader({ type, isViewStatus, onMutate, onStatus }) {
  const navigate = useNavigate();

  const { reset } = useNoticeSave();

  const handleClickCanceledButton = () => {
    reset();
    navigate('/notice');
  };

  return (
    <header className={styles.header}>
      <ModalButton
        type='canceled'
        text='나가기'
        onAction={handleClickCanceledButton}
      />
      {type !== 'detail' && (
        <ul className={styles.menuList}>
          <li className={`${styles.menuItem} ${isViewStatus && styles.active}`}>
            <button
              type='button'
              className={`${styles.menuButton} ${
                isViewStatus && styles.activeText
              }`}
              onClick={() => onStatus(true)}
            >
              서식 편집
            </button>
          </li>
          <li
            className={`${styles.menuItem} ${!isViewStatus && styles.active}`}
          >
            <button
              type='button'
              className={`${styles.menuButton} ${
                !isViewStatus && styles.activeText
              }`}
              onClick={() => onStatus(false)}
            >
              미리보기
            </button>
          </li>
        </ul>
      )}
      {type !== 'detail' && (
        <ModalButton type='mutated' text='저장하기' onAction={onMutate} />
      )}
    </header>
  );
}

export default NoticeMutateHeader;
