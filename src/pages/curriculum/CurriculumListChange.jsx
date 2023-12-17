import CurriculumContent from "../../components/Curriculum/CurriculumContent";
import CurriculumMutateHeader from "../../components/Curriculum/CurriculumMutateHeader";
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import { useState } from 'react';
import CurriculumChangeContent from "../../components/Curriculum/CurriculumChangeContent";

function CurriculumListChange() {

  const { data, isLoading } = useFetch(
    [],
    async () =>
      await axios({
        url: '/api/auth/read/manager_course',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
      onSuccess: ({ data }) => {
        setCourseId(parseInt(Object.entries(data.courseInfo)[0][0]));
      },
    }
  );
  const [courseId, setCourseId] = useState(
    data && Object.entries(data.data.courseInfo)[0]
  );

  if (isLoading) {
    return;
  }

  return (
    <div>
      <CurriculumMutateHeader />
      <CurriculumChangeContent
        courseId={courseId}
      />
    </div>
  );
}

export default CurriculumListChange;