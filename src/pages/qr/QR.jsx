import ContentHeader from '@components/common/ContentHeader';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './QR.module.css';
import axios from 'axios';
import { useMutation } from '@/hooks/useMutation';
import ClipLoader from 'react-spinners/ClipLoader';

function QR() {
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);
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
      id: 1,
    });
  }, []);

  if (!qr.length) {
    return;
  }

  const handleClickQRCreateButton = () => {
    mutate({
      id: 1,
    });
  };

  return (
    <>
      <ContentHeader
        title='QR'
        classes={classes}
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
