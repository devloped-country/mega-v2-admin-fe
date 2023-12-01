import SignupTitle from '@components/common/SIgnupTitle';
import styles from './Second.module.css';
import SignupButton from '@components/common/SignupButton';
import { useSignup } from '@/hooks/useSignup';
import { useLocation, useNavigate } from 'react-router-dom';

function Second() {
  const { courses, addCourses, updateCourses, removeCourses } = useSignup();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleChangeCourse = (target, id) => {
    const { value } = target;

    updateCourses(value, id);
  };

  const handleClickRemoveButton = (id) => {
    if (courses.length < 2) {
      return;
    }

    removeCourses(id);
  };

  const handleClickAddButton = () => {
    if (courses.length > 4) {
      return;
    }

    addCourses();
  };

  const handleClickNextButton = () => {
    if (!courses.every((course) => course.value.length !== 0)) {
      return;
    }

    navigate('/signup/3', {
      state: {
        courses: [...courses],
        ...state,
      },
    });
  };

  const mapedCourses = courses.map((course) => {
    return (
      <div key={course.id} className={styles.courseWrapper}>
        <input
          className={styles.input}
          placeholder='과정명을 입력해주세요.'
          value={course.value}
          onChange={({ target }) => handleChangeCourse(target, course.id)}
        />
        <button
          type='button'
          className={styles.courseButton}
          onClick={() => handleClickRemoveButton(course.id)}
        >
          <img
            src={
              courses.length === 1
                ? `${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-minus-circle-10469167 1.svg`
                : `${
                    import.meta.env.VITE_CLOUD_FRONT_ID
                  }/free-icon-font-minus-circle-10469167 2.svg`
            }
            alt='과정 버튼'
          />
        </button>
      </div>
    );
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.form}>
        <SignupTitle text='어떤 과정이신가요?' />
        {mapedCourses}
        <div className={styles.buttonWrapper}>
          <SignupButton
            text='과정 추가'
            onClick={handleClickAddButton}
            type='secondary'
          />
          <SignupButton text='다음' onClick={handleClickNextButton} />
        </div>
      </div>
    </section>
  );
}

export default Second;
