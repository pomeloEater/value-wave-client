import { has } from 'lodash-es';
const { kakao } = window;

const getKakaoLatLng = position => {
  let kakaoPosition = null;
  if (has(position, 'lng')) {
    kakaoPosition = new kakao.maps.LatLng(position.lat, position.lng);
  } else if (has(position, 'lon')) {
    kakaoPosition = new kakao.maps.LatLng(position.lat, position.lon);
  } else {
    kakaoPosition = new kakao.maps.LatLng(
      position.latitude,
      position.longitude
    );
  }
  return kakaoPosition;
};

export { getKakaoLatLng };
