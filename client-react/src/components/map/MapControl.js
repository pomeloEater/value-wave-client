/**
 * MapControl.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 지도 컨트롤 영역
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import * as _ from 'lodash-es';
import { BiCurrentLocation, BiPlus, BiMinus, BiMapAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import {
  zoomIn,
  zoomOut,
  setCurrentPosition,
  toggleOverlayMapType,
} from '../../features/mapControlSlice';

const MapControlWrapper = styled.nav`
  position: absolute;
  z-index: 20;
  top: 6rem;
  right: 1.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
`;

const Button = styled.div`
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

const SubButtonWrapper = styled.div`
  visibility: ${props => props.visibility || 'hidden'};
  position: absolute;
  right: 3rem;
  top: 11.35rem;
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
  const handleVisibleClick = () => {
    _.isEqual(visibility, 'hidden')
      ? setVisibility('visible')
      : setVisibility('hidden');
  };

  return (
    <MapControlWrapper>
      <ButtonWrapper>
        <Button
          key="mapMyLoc"
          onClick={() => dispatch(setCurrentPosition())}
          title="내 위치 보기"
        >
          <BiCurrentLocation />
        </Button>
        <ZoomButtonWrapper>
          <Button
            key="mapZoomIn"
            onClick={() => dispatch(zoomIn())}
            title="확대"
          >
            <BiPlus />
          </Button>
          <Button
            key="mapZoomOut"
            onClick={() => dispatch(zoomOut())}
            title="축소"
          >
            <BiMinus />
          </Button>
        </ZoomButtonWrapper>
        <Button
          key="mapLayers"
          title="지도"
          onClick={() => handleVisibleClick()}
        >
          <BiMapAlt />
          <SubButtonWrapper visibility={visibility}>
            <Button
              key="mapBaseHybrid"
              onClick=""
              title="스카이뷰"
              onClickCapture={() => dispatch(toggleOverlayMapType('HYBRID'))}
            >
              위성
            </Button>
            <Button
              key="mapBaseUseDistrict"
              onClick={() => dispatch(toggleOverlayMapType('DISTRICT'))}
              title="지적편집도"
            >
              지적
            </Button>
            <Button
              key="mapBaseTerrain"
              onClick={() => dispatch(toggleOverlayMapType('TERRIN'))}
              title="지형도"
            >
              지형
            </Button>
          </SubButtonWrapper>
        </Button>
      </ButtonWrapper>
    </MapControlWrapper>
  );
};

export default MapControl;
