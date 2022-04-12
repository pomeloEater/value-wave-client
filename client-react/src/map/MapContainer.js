/* global kakao */
import React, { useEffect, useState } from 'react';

const MapContainer = () => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const container = document.getElementById('mapContainer');
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const kakaomap = new kakao.maps.Map(container, options);
    // 지도 타입 컨트롤 생성하여 추가
    const mapTypeControl = new kakao.maps.MapTypeControl();
    kakaomap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    // 확대축소 컨트롤 생성하여 추가
    const zoomControl = new kakao.maps.ZoomControl();
    kakaomap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setMap(kakaomap);
  }, []);
  /* map.relayout(); */
  return (
    <div className="w-full h-full">
      <div id="mapContainer" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default MapContainer;
