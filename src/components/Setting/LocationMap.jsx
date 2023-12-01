import { Map } from 'react-kakao-maps-sdk';

function LocationMap({ lat, lng }) {
  return (
    <Map // 지도를 표시할 Container
      id='map'
      center={{
        // 지도의 중심좌표
        lat: lat || 35.172791735952956,
        lng: lng || 129.1307207873849,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '350px',
      }}
      level={3} // 지도의 확대 레벨
    />
  );
}

export default LocationMap;
