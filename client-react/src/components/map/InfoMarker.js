import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getKakaoLatLng } from './../../utils/kakaoUtils';
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
  bottom: 1.3rem;
  width: 4rem;
  height: auto;
  text-align: center;
  background-color: white !important;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  & * {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1rem;
  }
  &::before {
    content: '';
    border-color: slateblue transparent;
    border-style: solid;
    border-width: 0.9rem 0.9rem 0 0;
    box-shadow: var(--shadow-sm);
    display: block;
    top: 100%;
    position: absolute;
  }
`;

const ItemType = styled.span`
  width: 100%;
  color: var(--color-gray-600);
`;

const ItemValue = styled.span`
  background-color: slateblue;
  font-size: 1rem;
  color: white;
`;
const ItemYear = styled.span`
  background-color: slateblue;
  color: var(--color-gray-200);
`;

const InfoMarker = ({
  item,
  style,
  position,
  xAnchor,
  yAnchor,
  zIndex,
  clickable,
  onCreate,
  onMarkerClick,
  onInfoClick,
}) => {
  const { map } = useSelector(state => state.mapControl);
  const kakaoPosition = getKakaoLatLng(position);
  const container = useRef(null);
  const [visible, setVisible] = useState(true);

  const overlay = new kakao.maps.CustomOverlay({
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
    overlay.setMap(map);
    return () => {
      overlay.setMap(null);
    };
  }, [map, overlay]);

  useEffect(() => {
    if (onCreate) onCreate(overlay);
  }, [map, overlay]);

  return (
    <MarkerWrapper
      style={style}
      ref={container}
      onClick={onMarkerClick}
      onClickCapture={() => setVisible(!visible)}
    >
      {visible && (
        <WindowWrapper
          style={style}
          onClick={onInfoClick}
          onClickCapture={() => setVisible(!visible)}
          onMouseOver={() => overlay.setZIndex(20)}
          onMouseLeave={() => overlay.setZIndex(10)}
        >
          <ItemType>{item.type}</ItemType>
          <ItemValue>{item.price}</ItemValue>
          <ItemYear>{item.year}</ItemYear>
        </WindowWrapper>
      )}
    </MarkerWrapper>
  );
};

export default InfoMarker;
