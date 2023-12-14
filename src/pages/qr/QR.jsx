import ContentHeader from '@components/common/ContentHeader';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './QR.module.css';
import axios from 'axios';
import { useMutation } from '@/hooks/useMutation';
import { useFetch } from '@/hooks/useFetch';

function QR() {
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
  const [qr, setQr] = useState('');

  const { mutate } = useMutation(async (param) => {
    const { data } = await axios({
      url: '/api/qr',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'post',
      data: param,
    });

    setQr(data.qr);
  });

  useEffect(() => {
    mutate({
      id: courseId,
    });
  }, [courseId]);

  if (isLoading) {
    return;
  }

  if (!qr.length) {
    return;
  }

  const handleClickQRCreateButton = () => {
    mutate({
      id: courseId,
    });
  };

  return (
    <>
      <ContentHeader
        title='QR'
        classes={Object.entries(data.data.courseInfo)}
        setCourseId={setCourseId}
        img={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-qr-scan-12436470 1.svg`}
        buttonImg={`${
          import.meta.env.VITE_CLOUD_FRONT_ID
        }/free-icon-font-qr-scan-12436470 1.svg`}
        buttonText='QR 생성하기'
        isShowingButton={true}
        onButtonAction={handleClickQRCreateButton}
      />
      <div className={styles.wrapper}>
        <QRCodeSVG value={`localhost:8081/${qr}`} size={400} />
      </div>
    </>
  );
}

export default QR;
