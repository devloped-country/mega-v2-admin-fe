import ModalButton from "../common/ModalButton";
import styles from "./CurriculumMutateHeader.module.css";
import { useNavigate } from "react-router-dom";
import { useNoticeSave } from '@/hooks/useNoticeSave';

function CurriculumMutateHeader({ type, onMutate }) {

  const navigate = useNavigate();

  const { reset } = useNoticeSave();

  const onCancelButton = () => {
    reset();
    navigate('/curriculum');
  };


  return (
    <div className={styles.header}>
      <ModalButton type='canceled' text='나가기' onAction={onCancelButton} />
      {type !== 'detail' && (
        <ModalButton type='mutated' text='저장하기' onAction={onMutate} />
      )}
    </div>
  );
}

export default CurriculumMutateHeader;