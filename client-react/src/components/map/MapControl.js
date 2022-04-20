/**
 * MapControl.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 지도 컨트롤 영역
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { BiCurrentLocation, BiPlus, BiMinus, BiMapAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import {
  zoomIn,
  zoomOut,
  setCurrentPosition,
} from '../../features/mapControlSlice';

const MapControlWrapper = styled.nav`
  position: absolute;
  z-index: 20;
  top: 6rem;
  right: 1.25rem;
`;

const MapControlButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
`;

const MapControlButton = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  line-height: 2.3rem;
  text-align: center;
  background-color: white;
  border: 1px solid #b9bbbe;
  border-radius: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-md);
  & svg {
    width: 1.5rem;
    height: 2rem;
    display: inline-block;
  }
  & + & {
    box-shadow: var(--shadow-none);
    border-bottom: 1px solid #b9bbeb;
  }
`;

const ZoomButtonWrapper = styled.div`
  width: 2.5rem;
  height: 5rem;
`;

const MapControlButtonSubWrapper = styled.div`
  visibility: ${props => props.visibility || 'hidden'};
  position: absolute;
  right: 3rem;
  top: 9.75rem;
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 9rem;
  gap: 0.75rem;
  line-height: 2.5rem;
  text-align: center;
  height: 2.5rem;
  box-shadow: var(--shadow-md);
`;

// const MapControl = ({ mapControls }) => {
const MapControl = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState('hidden');
  const handleVisibilityToggle = e => {
    _.isEqual(visibility, 'hidden')
      ? setVisibility('visible')
      : setVisibility('hidden');
  };

  const mapControls = [
    {
      id: 'mapMyLoc',
      title: '내 위치 보기',
      icon: <BiCurrentLocation />,
      onClickFunction: null,
    },
    {
      id: 'mapZoomIN',
      title: '확대',
      icon: <BiPlus />,
      onClickFunction: null,
    },
    {
      id: 'mapZoomOut',
      title: '축소',
      icon: <BiMinus />,
      onClickFunction: null,
    },
    {
      id: 'mapLayers',
      title: '지도',
      icon: <BiMapAlt />,
      onClickFunction: handleVisibilityToggle,
      subMenu: [
        {
          id: 'mapBaseHybrid',
          title: '스카이뷰',
          onClickFunction: null,
          name: '위성',
        },
        {
          id: 'mapBaseUseDistrict',
          title: '지적편집도',
          onClickFunction: null,
          name: '지적',
        },
        {
          id: 'mapBaseTerrain',
          title: '지형도',
          onClickFunction: null,
          name: '지형',
        },
      ],
    },
  ];
  return (
    <MapControlWrapper>
      <MapControlButtonWrapper>
        <MapControlButton
          key="mapMyLoc"
          onClick={() => dispatch(setCurrentPosition())}
          title="내 위치 보기"
        >
          <BiCurrentLocation />
        </MapControlButton>
        <ZoomButtonWrapper>
          <MapControlButton
            key="mapZoomIn"
            onClick={() => dispatch(zoomIn())}
            title="확대"
          >
            <BiPlus />
          </MapControlButton>
          <MapControlButton
            key="mapZoomOut"
            onClick={() => dispatch(zoomOut())}
            title="축소"
          >
            <BiMinus />
          </MapControlButton>
        </ZoomButtonWrapper>
      </MapControlButtonWrapper>
    </MapControlWrapper>
  );
};

export default MapControl;
