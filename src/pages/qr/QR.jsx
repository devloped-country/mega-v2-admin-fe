import ContentHeader from '@components/common/ContentHeader';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './QR.module.css';

function QR() {
  const [classes, setClasses] = useState([
    { name: '클라우드 네이티브 애플리케이션 개발자 양성과정', class: 'dev' },
    { name: '클라우드 엔지니어 전문가 양성과정', class: 'devops' },
  ]);

  const handleClickQRCreateButton = () => {
    console.log('!!');
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
        <QRCodeSVG value='/' size={400} />
      </div>
    </>
  );
}

export default QR;
