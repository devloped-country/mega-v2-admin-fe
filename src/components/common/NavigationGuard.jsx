import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import { useNavigate } from 'react-router';

function NavigationGuard({ children }) {
  const navigate = useNavigate();

  useFetch(
    [],
    async () =>
      await axios({
        url: 'https://user.mzc-appmega.click/api/auth/checklogin',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    {
      onError: ({ response }) => {
        if (response.status === 403) navigate('/intro');
      },
    }
  );

  return children;
}

export default NavigationGuard;
