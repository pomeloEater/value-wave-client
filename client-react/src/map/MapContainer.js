import React, { useEffect, useState, useRef } from 'react';
const { kakao } = window;

const MapContainer = props => {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(4);

  useEffect(() => {
    initMap(zoomLevel);
  }, []);

  /* 최초 생성 */
  const initMap = ({ zoomLevel }) => {
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: zoomLevel,
    };
    const kakaomap = new kakao.maps.Map(container.current, options);

    // // 지도 타입 컨트롤 생성하여 추가
    // const mapTypeControl = new kakao.maps.MapTypeControl();
    // kakaomap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    /* 
      # custom map layer 필요
      https://apis.map.kakao.com/web/documentation/#MapTypeId
      kakao.maps.MapTypeId.HYBRID
      kakao.maps.MapTypeId.TERRAIN
      kakao.maps.MapTypeId.ROADVIEW
      kakao.maps.MapTypeId.USE_DISTRICT
      map.addOverlayMapTypeId / map.removeOverlayMapTypeId

      # 확대축소는 그냥 +/- 정도로만
    */

    // // 확대축소 컨트롤 생성하여 추가
    // const zoomControl = new kakao.maps.ZoomControl();
    // kakaomap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // state에 map 부여
    setMap(kakaomap);
  };

  /* map.relayout(); */
  return (
    <div className="w-full h-full">
      <div
        id="mapContainer"
        ref={container}
        style={{ width: '100%', height: '100%' }}
      ></div>
    </div>
  );
};

export default MapContainer;
