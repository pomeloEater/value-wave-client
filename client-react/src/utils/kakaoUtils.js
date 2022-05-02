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

const getPolygonPath = coordinates => {
  const path = [];
  let firstPath = [],
    secondPath = [],
    kakaoCoords = null;
  for (let firstCoords of coordinates) {
    firstPath = [];
    for (let secondCoords of firstCoords) {
      secondPath = [];
      for (let thirdCoords of secondCoords) {
        kakaoCoords = new kakao.maps.LatLng(thirdCoords[1], thirdCoords[0]);
        secondPath.push(kakaoCoords);
      }
      firstPath.push(secondPath);
    }
    path.push(firstPath);
  }
  return path;
};

export { getKakaoLatLng, getPolygonPath };
