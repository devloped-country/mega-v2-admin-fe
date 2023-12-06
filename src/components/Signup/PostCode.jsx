import { useDaumPostcodePopup } from 'react-daum-postcode';
import styles from './PostCode.module.css';
import { useSignup } from '@/hooks/useSignup';

function PostCode({ changeLatitude, changeLongitude }) {
  const { address, changeAddress } = useSignup();
  const open = useDaumPostcodePopup(
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );

  const kakaoMapGeoCoder = (address) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const [firstResult] = result;

          changeLatitude(firstResult.y);
          changeLongitude(firstResult.x);
        }
      });
    });
  };

  const handleComplete = (data) => {
    console.log(data);
    changeAddress(data.address);
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
        placeholder='주소'
        value={address}
      />
      <button
        type='button'
        className={styles.button}
        onClick={handleClickButton}
      >
        찾기
      </button>
    </div>
  );
}

export default PostCode;
