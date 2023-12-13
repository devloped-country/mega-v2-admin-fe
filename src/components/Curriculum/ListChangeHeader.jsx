import ModalButton from '@components/common/ModalButton';
import { useNavigate } from 'react-router-dom';
import styles from './ListChangeHeader.module.css';

function ListChangeHeader() {
  const navigate = useNavigate();

  const onAddButtonAction = () => {
    navigate('/curriculum');
  }

  return (
    <div className={styles.wrapper}>
      <p>나가기</p>
      <ModalButton type='mutated' text='추가' onAction={onAddButtonAction} />
    </div>
  );
}

export default ListChangeHeader;