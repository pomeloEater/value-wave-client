import React, { useState } from 'react';
import styled from 'styled-components';
import { isEmpty, isEqual } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { setPnu, toggleSearch } from 'slices/viewControlSlice';
import AsideSearch from 'components/aside/AsideSearch';
import BasicModal from 'components/modal/BasicModal';
const { kakao } = window;

/* 범례 */
const AsideWrapper = styled.aside`
  position: relative;
  z-index: 30;
  display: grid;
  grid-template-rows: 50px auto;
  width: 24rem;
  height: 100%;
  background-color: var(--color-white);
  border-left: 1px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 100%;
    bottom: 0;
  }
  @media ${({ theme }) => theme.device.laptop} {
  }
`;

/* elements */

const ResultsWrapper = styled.div`
  position: inherit;
  width: 100%;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResultWrapper = styled.div`
  background-color: ${props =>
    props.active ? `var(--color-gray-300)` : `var(--color-gray-100)`};
  padding: 0.5rem 1rem;
  &:hover {
    background-color: var(--color-gray-300);
    font-weight: 300;
  }
`;

const SmallTitleWrapper = styled.span`
  font-weight: 600;
  margin-right: 0.25rem;
`;

const Result = props => {
  const { map } = useSelector(state => state.mapControl);
  const { bdNm, jibunAddr, roadAddr, pnu, entX, entY, active } = props;
  const handleClickEvent = () => {
    const locPosition = new kakao.maps.LatLng(entY, entX);
    setPnu(pnu);
    map.setCenter(locPosition);
  };
  return (
    <ResultWrapper onClick={handleClickEvent} active={active}>
      <p>{bdNm}</p>
      {jibunAddr ? (
        <h5>
          <SmallTitleWrapper>지번주소</SmallTitleWrapper>
          {jibunAddr}
        </h5>
      ) : (
        ''
      )}
      {roadAddr ? (
        <h5>
          <SmallTitleWrapper>도로명주소</SmallTitleWrapper>
          {roadAddr}
        </h5>
      ) : (
        ''
      )}
    </ResultWrapper>
  );
};

const SearchAside = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalOpened, setModalOpened] = useState(true);

  /* functions */
  const handleClickEvent = () => {
    dispatch(toggleSearch());
  };
  const handleInputKeyDown = e => {
    if (isEqual(e.key, 'Enter')) {
      searchFunction(e.target.value);
    }
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    searchFunction(e.target.value);
  };
  const placeholder = '건물명, 지번, 도로명 검색';
  const searchFunction = query => {
    setLoading(true);
    if (isEmpty(query)) {
      setResults([]);
      setLoading(false);
      return;
    }
    fetch(`api/jusoro/search-address/${query}`)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        if (isEqual('success', json['_result_'])) {
          console.log(json);
          setResults(json.data.juso);
        } else {
          setResults([]);
        }
      });
  };
  const handleModalOpen = props => {
    const { pnu, index } = props;
    setModalOpened(true);
    setPnu(pnu);
    activeIndex == index ? setActiveIndex(null) : setActiveIndex(index);
  };
  const handleModalClose = () => {
    setModalOpened(false);
  };

  return (
    <AsideWrapper>
      <AsideSearch
        handleClickEvent={handleClickEvent}
        handleInputKeyDown={handleInputKeyDown}
        handleFormSubmit={handleFormSubmit}
        placeholder={placeholder}
      />
      <ResultsWrapper>
        {isLoading ? (
          <h5 style={{ textAlign: 'center' }}>검색 중입니다.</h5>
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <Result
              key={index}
              bdNm={result.bdNm}
              jibunAddr={result.jibunAddr}
              roadAddr={result.roadAddr}
              pnu={result.pnu}
              entX={result.entX}
              entY={result.entY}
              active={index == activeIndex}
              onClick={() => handleModalOpen(index, result.pnu)}
            />
          ))
        ) : (
          <h5 style={{ textAlign: 'center' }}>검색 결과가 없습니다.</h5>
        )}
      </ResultsWrapper>
      {modalOpened && (
        <BasicModal closeModal={handleModalClose} title={'테스트'}>
          테스트내용
        </BasicModal>
      )}
    </AsideWrapper>
  );
};

export default SearchAside;
