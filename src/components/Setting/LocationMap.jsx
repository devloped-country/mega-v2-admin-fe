import { Map, MapMarker } from 'react-kakao-maps-sdk';

function LocationMap({ lat, lng }) {
  return (
    <Map // 지도를 표시할 Container
      id='map'
      center={{
        // 지도의 중심좌표
        lat: lat,
        lng: lng,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '350px',
      }}
      level={3} // 지도의 확대 레벨
      draggable={false}
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: lat,
          lng: lng,
        }}
      />
    </Map>
  );
}

export default LocationMap;
