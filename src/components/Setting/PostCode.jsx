import { useDaumPostcodePopup } from 'react-daum-postcode';
import Button from '@components/common/Button';
import styles from './PostCode.module.css';
// import ReactKakaoMapsSDK from 'react-kakao-maps-sdk';
import { useState } from 'react';

function PostCode({ setLat, setLng }) {
  const [address, setAddress] = useState('');

  const open = useDaumPostcodePopup(
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );

  const kakaoMapGeoCoder = (address) => {
    window.kakao.maps.load(() => {
      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const [firstResult] = result;
          console.log(firstResult.address_name);
          setLat(firstResult.y);
          setLng(firstResult.x);
        }
      });
    });
  };

  const handleComplete = (data) => {
    setAddress(data.address);
    kakaoMapGeoCoder(data.address);
  };

  const handleClickButton = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className={styles.wrapper}>
      <input
        type='text'
        className={styles.readAddress}
        readOnly
        value={address}
      />
      <Button text='주소 찾기' onAction={handleClickButton} />
    </div>
  );
}

export default PostCode;
