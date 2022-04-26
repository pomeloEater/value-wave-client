import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getKakaoLatLng } from './../../utils/kakaoUtils';
// import useKakaoEvent from './../../hooks/useKakaoEvent';
const { kakao } = window;

const MarkerWrapper = styled.div`
  /* width: 0.5rem;
  height: 0.5rem; */
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: black;
  border: 1px solid black;
  cursor: pointer;
`;

const Marker = ({
  style,
  position,
  xAnchor,
  yAnchor,
  zIndex,
  clickable,
  onCreate,
  onClickEvent,
  children,
}) => {
  const { map } = useSelector(state => state.mapControl);
  const container = useRef(null);
  const kakaoPosition = getKakaoLatLng(position);

  const marker = new kakao.maps.CustomOverlay({
    position: kakaoPosition,
    map,
    clickable,
    xAnchor,
    yAnchor,
    zIndex,
    onCreate,
    content: container.current,
  });

  useEffect(() => {
    marker.setMap(map);
  }, [map, marker]);

  useEffect(() => {
    if (onCreate) onCreate(marker);
  }, [map, marker]);

  return (
    <MarkerWrapper style={style} ref={container} onClick={onClickEvent}>
      {children}
    </MarkerWrapper>
  );
};

export default Marker;
