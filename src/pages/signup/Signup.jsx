import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import First from '@components/Signup/First';
import Second from '@components/Signup/Second';
import Third from '@components/Signup/Third';
import Fourth from '@components/Signup/Fourth';
import { useSignup } from '@/hooks/useSignup';

function Signup() {
  const { page } = useParams();
  const { state } = useLocation();
  const [courses, setCourses] = useState([
    {
      id: uuid(),
      value: '',
    },
  ]);
  const [address, setAddress] = useState('');
  const [adminName, setAdminName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleClickSecondCourseButton = () => {
    if (courses.length > 4) {
      return;
    }

    setCourses((prev) => [...prev, { id: uuid(), value: '' }]);
  };

  const handleInputCourseChangeAction = (id, e) => {
    setCourses((prev) => {
      return prev.map((course) => {
        if (course.id === id) {
          return {
            ...course,
            value: e.target.value,
          };
        }

        return course;
      });
    });
  };

  const handleButtonRemoveAction = (id) => {
    if (courses.length < 2) {
      return;
    }

    setCourses((prev) => {
      return prev.filter((course) => course.id !== id);
    });
  };

  const handleClickSecondPageButton = () => {
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

  const handleComplete = (data) => {
    setAddress(data.address);
  };

  const handleChangeAdminName = ({ target }) => {
    setAdminName(target.value);
  };

  const handleChangePhoneNumber = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const handleClickThirdPageButton = () => {
    if (!address.length || !adminName.length || !phoneNumber.length) {
      return;
    }
    console.log({
      state: { address, adminName, phoneNumber, ...state },
    });
    navigate('/signup/4', {
      state: { address, adminName, phoneNumber, ...state },
    });
  };

  if (parseInt(page) === 1) {
    return <First />;
  } else if (parseInt(page) === 2) {
    return (
      <Second
        courses={courses}
        onInputCourseChangeAction={handleInputCourseChangeAction}
        onButtonRemoveAction={handleButtonRemoveAction}
        onAction={handleClickSecondPageButton}
        onButtonAction={handleClickSecondCourseButton}
      />
    );
  } else if (parseInt(page) === 3) {
    return (
      <Third
        address={address}
        adminName={adminName}
        phoneNumber={phoneNumber}
        onComplete={handleComplete}
        onChangeAdminName={handleChangeAdminName}
        onChangeAmdinPhoneNumber={handleChangePhoneNumber}
        onAction={handleClickThirdPageButton}
      />
    );
  } else if (parseInt(page) === 4) {
    return <Fourth />;
  }

  return <div></div>;
}

export default Signup;
