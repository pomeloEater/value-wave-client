/**
 * MapControl.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 지도 컨트롤 영역
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { ShadowMiddle } from '../assets/styles/Shadow';
import { BiCurrentLocation, BiPlus, BiMinus, BiMapAlt } from 'react-icons/bi';

const iconStyle = { width: '1.8rem', height: '2rem', display: 'inline-block' };

const MapControlWrapper = styled.aside`
  position: absolute;
  z-index: 20;
  top: 1.25rem;
  right: 1.25rem;
`;

const MapControlButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
`;

const MapControlButton = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  background-color: white;
  border: 1px solid #b9bbbe;
  border-radius: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${ShadowMiddle}
  & svg {
    width: 1.8rem;
    height: 2rem;
    display: inline-block;
  }
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
  ${ShadowMiddle}
`;

// const MapControl = ({ mapControls }) => {
const MapControl = () => {
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
        {mapControls.map(control => (
          <MapControlButton
            key={control.id}
            onClick={control.onClickFunction}
            title={control.title}
          >
            {control.icon}
            {control.subMenu && (
              <MapControlButtonSubWrapper visibility={visibility.toString()}>
                {control.subMenu &&
                  control.subMenu.map(sub => (
                    <MapControlButton key={sub.id} title={sub.title}>
                      {sub.name}
                    </MapControlButton>
                  ))}
              </MapControlButtonSubWrapper>
            )}
          </MapControlButton>
        ))}
      </MapControlButtonWrapper>
    </MapControlWrapper>
  );
};

export default MapControl;
