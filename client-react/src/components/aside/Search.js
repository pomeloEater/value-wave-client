/**
 * Search.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-사이드바-검색 영역
 */
import React, { useState } from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import { ShadowMiddle } from '../../assets/styles/Shadow';
import { HiOutlineDocumentSearch, HiOutlineSearch } from 'react-icons/hi';
const { kakao } = window;

/* components' style */
const searchIconStyle = {
  width: '2rem',
  height: '2rem',
  color: '#b9bbbe',
};
const detailSearchIconStyle = { width: '1.8rem', height: '2rem' };

/* components */
const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  border: 1px solid #b9bbbe;
  border-radius: 0.5rem;
  justify-content: space-between;
  ${ShadowMiddle}
`;
const SearchForm = styled.form`
  position: relative;
`;
const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  cursor: pointer;
  width: 3rem;
`;
const SearchInput = styled.input`
  flex: 1 1 auto;
  padding: 0.75rem 1.75rem 0.75rem 0.75rem;
  margin-right: 0px;
  border: 1px transparent;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;
const SearchButton = styled.button`
  padding: 0.25rem;
  position: absolute;
  width: 2.1rem;
  right: 0px;
  top: 0.2rem;
`;
const SearchDetailButton = styled.button`
  padding: 0.25rem;
  width: 3rem;
`;

/*  */

/* 검색영역 */
const Search = () => {
  // input value 및 change event
  const [value, setValue] = useState('');
  const handleInputChange = e => {
    setValue(e.target.value);
  };
  const handleInputKeyUp = e => {
    if (_.isEqual(e.key, 'Enter')) {
      searchFunction(e.target.value);
    }
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    searchFunction(e.target.value);
  };

  const ps = new kakao.maps.services.Places();

  /**
   * 장소 검색
   * @param {string} _value
   */
  const searchFunction = _value => {
    if (_.isNull(_value)) {
      // TODO: alert창 만들기
      alert('내용을 입력하여 주십시오.');
    }
    console.log(_value);
    ps.keywordSearch(_value, searchCallback);
  };
  const searchCallback = (_data, _status, _pagination) => {
    if (_.isEqual(_status, kakao.maps.services.Status.OK)) {
      console.log(_data);
      // displayPlaces(_data);
      // displayPagination(_pagination);
    } else if (_.isEqual(_status, kakao.maps.services.Status.ZERO_RESULT)) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (_.isEqual(_status, kakao.maps.services.Status.ERROR)) {
      alert('검색 중 오류가 발생했습니다.');
      return;
    }
  };

  return (
    <SearchWrapper>
      <LogoWrapper title="value-wave">로고</LogoWrapper>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchInput
          type="text"
          placeholder="건물명, 지번, 도로명 검색"
          onChange={handleInputChange}
          onKeyUp={handleInputKeyUp}
          value={value}
        />
        <SearchButton type="submit" title="검색">
          <HiOutlineSearch style={searchIconStyle} />
        </SearchButton>
      </SearchForm>
      <SearchDetailButton type="button" title="상세검색">
        <HiOutlineDocumentSearch style={detailSearchIconStyle} />
      </SearchDetailButton>
    </SearchWrapper>
  );
};

export default Search;
