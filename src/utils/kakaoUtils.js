import { isEqual, isNull, keys } from 'lodash-es';
import proj4 from 'proj4';
const { kakao } = window;

// projection 설정
proj4.defs(
  'GRS-80',
  '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs'
);

/**
 * 좌표 객체(WGS84) 생성
 * @param {position, latType} position: 위/경도로 이루어진 json / latType: 경도 표기명
 * @returns kakao.maps.LatLng
 */
const getKakaoLatLng = props => {
  const { position, latType } = props;

  // latType이 없는 경우를 위해 position에서 가져오기
  let keyArray = keys(position);
  let latIndex = keyArray.findIndex(
    key => key == 'lng' || key == 'lon' || key == 'entX' || key == 'longitude'
  );
  let latTypeFromPosition = keyArray[latIndex];
  // GRS-80인 경우 좌표계 변환
  let projArray = [];
  if (latTypeFromPosition == 'entX') {
    projArray = proj4('GRS-80', 'EPSG:4326', [position.entY, position.entX]);
  }
  switch (latType || latTypeFromPosition) {
    case 'lng':
      return new kakao.maps.LatLng(position.lat, position.lng);
    case 'lon':
      return new kakao.maps.LatLng(position.lat, position.lon);
    case 'entX':
      return new kakao.maps.LatLng(projArray[1], projArray[0]);
    case 'longitude':
    default:
      return new kakao.maps.LatLng(position.latitude, position.longitude);
  }
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
