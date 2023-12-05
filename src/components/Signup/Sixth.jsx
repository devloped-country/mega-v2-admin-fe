import styles from './Sixth.module.css';

function Sixth() {
  const kakaoMapGeoCoder = (address) => {
    window.kakao.maps.load(() => {
      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const [firstResult] = result;

          setLat(firstResult.y);
          setLng(firstResult.x);
        }
      });
    });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          <img
            className={styles.icon}
            src={`${import.meta.env.VITE_CLOUD_FRONT_ID}/map-marker.svg`}
            alt='위치 설정'
          />
          위치 설정
        </h3>
        <PostCode setLat={setLat} setLng={setLng} />
      </header>
      <div className={styles.content}>
        <LocationMap lat={lat} lng={lng} />
      </div>
      <footer className={styles.footer}>
        <ModalButton type='canceled' text='취소' />
        <ModalButton type='mutated' text='확인' />
      </footer>
    </div>
  );
}

export default Sixth;
