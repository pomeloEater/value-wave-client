import { has, isEqual, isNull } from 'lodash-es';
const { kakao } = window;

/**
 * 좌표 객체(WGS84) 생성
 * @param {json} position : 위도,경도로 이루어진 json;
 * @returns
 */
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

/**
 * 좌표 객체 path array를 포함한 feature 객체 생성
 * @param {properties, geometry:Array} feature
 * @returns {properties, path:[kakao.maps.LatLng], coordinates:Array}
 */
const getPolygonFeature = feature => {
  const { properties, geometry } = feature;
  const path = [],
    coordinates = [];
  let firstPath = [],
    // secondPath = [],
    kakaoCoords = null;
  if (isEqual(geometry.type, 'Polygon')) {
    for (let firstCoords of geometry.coordinates) {
      firstPath = [];
      for (let secondCoords of firstCoords) {
        coordinates.push(secondCoords);
        kakaoCoords = new kakao.maps.LatLng(secondCoords[1], secondCoords[0]);
        firstPath.push(kakaoCoords);
      }
      path.push(firstPath);
    }
  } else if (isEqual(geometry.type, 'MultiPolygon')) {
    /** TODO MultiPolygon path 생성 구현하기 */
    // for (let firstCoords of geometry.coordinates) {
    //   firstPath = [];
    //   for (let secondCoords of firstCoords) {
    //     secondPath = [];
    //     for (let thirdCoords of secondCoords) {
    //       kakaoCoords = new kakao.maps.LatLng(thirdCoords[0], thirdCoords[1]);
    //       secondPath.push(kakaoCoords);
    //     }
    //     firstPath.push(secondPath);
    //   }
    //   path.push(firstPath);
    // }
  }
  return { properties, path, coordinates };
};

/**
 * (useKakaoEvent 사용 불가능한 경우) API 객체 이벤트 등록
 * @param {EventTarget} target 이벤트를 지원하는 카카오 지도 API 객체
 * @param {String} type 이벤트 이름
 * @param {Function} callback 이벤트를 처리할 함수
 * @returns
 */
const setKakaoEvent = (target, type, callback) => {
  if (isNull(target) || isNull(type) || isNull(callback)) return;
  const callbackWrapper = (...args) => {
    return callback(target, ...args);
  };

  kakao.maps.event.addListener(target, type, callbackWrapper);
};

export { getKakaoLatLng, getPolygonFeature, setKakaoEvent };
