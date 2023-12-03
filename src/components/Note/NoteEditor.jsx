import styles from './NoteEditor.module.css';
import ModalButton from '@/components/common/ModalButton';

function NoteEditor({ handleCancelClick }) {
  return (
    <section className={styles.wrapper}>
      <input
        type='text'
        placeholder='제목을 입력하세요'
        className={styles.title}
      />
      <textarea placeholder='내용을 입력하세요' className={styles.content} />
      <footer className={styles.footer}>
        <ModalButton onAction={handleCancelClick} text='취소' />
        <ModalButton type='mutated' onAction={() => {}} text='전송' />
      </footer>
    </section>
  );
}

export default NoteEditor;
