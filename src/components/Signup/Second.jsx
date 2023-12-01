import SignupTitle from '@components/common/SIgnupTitle';
import styles from './Second.module.css';
import SignupButton from '@components/common/SignupButton';

function Second({
  courses,
  onInputCourseChangeAction,
  onButtonRemoveAction,
  onButtonAction,
  onAction,
}) {
  const mapedCourses = courses.map((course) => {
    return (
      <div key={course.id} className={styles.courseWrapper}>
        <input
          className={styles.input}
          placeholder='과정명을 입력해주세요.'
          value={course.value}
          onChange={(e) => onInputCourseChangeAction(course.id, e)}
        />
        <button
          type='button'
          className={styles.courseButton}
          onClick={() => onButtonRemoveAction(course.id)}
        >
          <img
            src={
              courses.length === 1
                ? `${
                    import.meta.env.VITE_COULD_FRONT
                  }free-icon-font-minus-circle-10469167 1.svg`
                : `${
                    import.meta.env.VITE_COULD_FRONT
                  }free-icon-font-minus-circle-10469167 2.svg`
            }
            alt='과정 버튼'
          />
        </button>
      </div>
    );
  });

  return (
    <section className={styles.wrapper}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <SignupTitle text='어떤 과정이신가요?' />
        {mapedCourses}
        <div className={styles.buttonWrapper}>
          <SignupButton
            text='과정 추가'
            onClick={onButtonAction}
            type='secondary'
          />
          <SignupButton text='다음' onClick={onAction} />
        </div>
      </form>
    </section>
  );
}

export default Second;
