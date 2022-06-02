import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getKakaoLatLng } from 'utils/kakaoUtils';
const { kakao } = window;

const MarkerWrapper = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  /* width: 1rem;
  height: 1rem; */
  border-radius: 50%;
  background-color: black;
  border: 1px solid black;
  cursor: pointer;
`;

const WindowWrapper = styled.div`
  position: absolute;
  white-space: nowrap;
  bottom: 1.1rem;
  left: -0.4rem;
  width: max-content;
  height: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  background-color: white !important;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 3px solid slateblue;
  & * {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1rem;
  }
  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 100%;
    margin-top: 1px;
    border-color: slateblue transparent;
    border-style: solid;
    border-width: 0.9rem 0.9rem 0 0;
    box-shadow: var(--shadow-sm);
  }
`;

const InfoMarker = ({
  children,
  style,
  position,
  xAnchor,
  yAnchor,
  zIndex,
  onCreate,
  onMarkerClick,
  onInfoClick,
}) => {
  const { map } = useSelector(state => state.mapControl);
  const kakaoPosition = getKakaoLatLng({ position });
  const container = useRef(null);

  const overlay = new kakao.maps.CustomOverlay({
    position: kakaoPosition,
    map,
    xAnchor,
    yAnchor,
    zIndex,
    onCreate,
    content: container.current,
  });

  useEffect(() => {
    overlay.setMap(map);
    return () => {
      overlay.setMap(null);
    };
  }, [map, overlay]);

  useEffect(() => {
    if (onCreate) onCreate(overlay);
  }, [map, overlay]);

  return (
    <MarkerWrapper style={style} ref={container} onClick={onMarkerClick}>
      {children && (
        <WindowWrapper
          style={style}
          onClick={onInfoClick}
          onMouseOver={() => overlay.setZIndex(20)}
          onMouseLeave={() => overlay.setZIndex(10)}
        >
          {children}
        </WindowWrapper>
      )}
    </MarkerWrapper>
  );
};

export default InfoMarker;
