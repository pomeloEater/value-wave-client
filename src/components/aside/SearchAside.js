import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isEmpty, isEqual, isNull } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { setPnu, toggleSearch } from 'slices/viewControlSlice';
import AsideSearch from 'components/aside/AsideSearch';
import { getKakaoLatLng } from 'utils/kakaoUtils';
import { setSearchResults } from 'slices/mapControlSlice';
import BasicModal from 'components/modal/BasicModal';
import EstateContent from 'components/modal/content/EstateContent';

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
    props.isActive ? `var(--color-gray-300)` : `var(--color-gray-100)`};
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
  const dispatch = useDispatch();
  const { map } = useSelector(state => state.mapControl);
  const { key, bdNm, jibunAddr, roadAddr, pnu, entX, entY, handleModalOpen } =
    props;
  const handleClickEvent = () => {
    dispatch(setPnu(pnu));
    if (isNull(entX) || isNull(entY)) {
      return;
    }
    const locPosition = getKakaoLatLng({
      position: { entX, entY },
      latType: 'entX',
    });
    map.setCenter(locPosition);
    handleModalOpen(key);
  };
  //  TODO 검색 CARD 레이아웃 변경
  return (
    <ResultWrapper onClick={handleClickEvent}>
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
  const { map, searchResults } = useSelector(state => state.mapControl);
  const [isLoading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

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
      setLoading(false);
      return;
    }
    fetch(`api/jusoro/search-address/${query}`)
      .then(res => res.json())
      .then(json => {
        if (isEqual('success', json['_result_'])) {
          setErrorMessage(null);
          dispatch(setSearchResults(json.data.juso));
        } else {
          setErrorMessage(json.data.common.errorMessage);
          dispatch(setSearchResults([]));
        }
        setLoading(false);
      });
  };
  const handleModalOpen = _index => {
    setActiveIndex(_index);
    setModalOpened(true);
  };
  const handleModalClose = () => {
    setModalOpened(false);
  };

  /** 검색결과 첫번째 대상으로 위치 이동 */
  useEffect(() => {
    if (searchResults.length == 0) return;
    setActiveIndex(0);
    const target = searchResults[0];
    const locPosition = getKakaoLatLng({
      position: { entX: target.entX, entY: target.entY },
    });
    map.setCenter(locPosition);
  }, [searchResults]);

  return (
    <AsideWrapper>
      <AsideSearch
        handleClickEvent={handleClickEvent}
        handleInputKeyDown={handleInputKeyDown}
        handleFormSubmit={handleFormSubmit}
        placeholder={placeholder}
      />
      <ResultsWrapper>
        {isLoading && <h5 style={{ textAlign: 'center' }}>검색 중입니다.</h5>}
        {!isLoading && searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <Result
              key={index}
              bdNm={result.bdNm}
              jibunAddr={result.jibunAddr}
              roadAddr={result.roadAddr}
              pnu={result.pnu}
              entX={result.entX}
              entY={result.entY}
              isActive={index == activeIndex}
              handleModalOpen={() => handleModalOpen(index)}
            />
          ))
        ) : (
          <h5 style={{ textAlign: 'center' }}>
            {errorMessage || '검색 결과가 없습니다.'}
          </h5>
        )}
      </ResultsWrapper>
      {modalOpened && (
        <BasicModal closeModal={handleModalClose} title={'부동산종합정보'}>
          <EstateContent />
        </BasicModal>
      )}
    </AsideWrapper>
  );
};

export default SearchAside;
