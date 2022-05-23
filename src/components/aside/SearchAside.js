import React, { useState } from 'react';
import styled from 'styled-components';
import { isEmpty, isEqual } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearch } from 'slices/viewControlSlice';
import AsideSearch from 'components/aside/AsideSearch';
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
  background-color: var(--color-gray-100);
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
  const { bdNm, jibunAddr, roadAddr, /* bdMgtSn, */ entX, entY } = props;
  // const pnuCode = bdMgtSn.substring(0, 19);
  const handleClickEvent = e => {
    console.log(e);
    // console.log(pnuCode);
    const locPosition = new kakao.maps.LatLng(entY, entX);
    map.setCenter(locPosition);
  };
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
  const [results, setResults] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(0);

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
    if (isEmpty(query)) {
      setResults([]);
      return;
    }
    /** 카카오 로컬 api */
    // fetch(`api/local/search-address/${query}`)
    //   .then(res => res.json())
    //   .then(json => {
    //     if (isEqual('success', json['_result_'])) {
    //       setResults(json.data.documents);
    //     } else {
    //       setResults([]);
    //     }
    //   });
    /**  도로명주소 api */
    fetch(`api/jusoro/search-address/${query}`)
      .then(res => res.json())
      .then(json => {
        if (isEqual('success', json['_result_'])) {
          console.log(json);
          setResults(json.data.juso);
        } else {
          setResults([]);
        }
      });
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
        {results.length > 0 &&
          results.map((result, index) => (
            <Result
              key={index}
              /** 카카오로컬 */
              // bdNm={result.address_name}
              // jibunAddr={result?.address?.address_name || ''}
              // roadAddr={result?.road_address?.address_name || ''}
              /** 도로명주소 */
              bdNm={result.bdNm}
              jibunAddr={result.jibunAddr}
              roadAddr={result.roadAddr}
              /** 공통(JUSORO || KAKAO) */
              bdMgtSn={result.bdMgtSn || 0}
              entX={result.entX || result.x}
              entY={result.entY || result.y}
              // active={index == activeIndex}
            />
          ))}
      </ResultsWrapper>
    </AsideWrapper>
  );
};

export default SearchAside;
