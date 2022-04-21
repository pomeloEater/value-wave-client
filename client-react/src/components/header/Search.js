/**
 * Search.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 검색 영역
 */
import React, { useState } from 'react';
import * as _ from 'lodash-es';
import styled from 'styled-components';
import { HiOutlineDocumentSearch, HiOutlineSearch } from 'react-icons/hi';

/* components' style */
const searchIconStyle = {
  width: '2rem',
  height: '2rem',
  color: '#b9bbbe',
};
const detailSearchIconStyle = { width: '1.8rem', height: '2rem' };

/* elements */
const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  border: 1px solid var(--color-gray-400);
  border-radius: 0.5rem;
  justify-content: space-between;
  box-shadow: var(--shadow-md);
`;
const SearchForm = styled.form`
  position: relative;
  flex: auto;
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
  width: auto;
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
const LineDiv = styled.div`
  margin-top: 0.5rem;
`;
const LineSpan = styled.span`
  width: 1px;
  background: #000;
  opacity: 0.1;
  height: 2rem;
  display: block;
`;
const SearchDetailButton = styled.button`
  padding: 0.25rem;
  width: 3rem;
`;

/* components */
const Search = () => {
  // input value 및 change event
  const [value, setValue] = useState('');
  const handleInputChange = e => {
    setValue(e.target.value);
  };
  const handleInputKeyUp = e => {
    if (_.isEqual(e.key, 'Enter')) {
      // searchFunction(e.target.value);
    }
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    // searchFunction(e.target.value);
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
      <LineDiv>
        <LineSpan />
      </LineDiv>
      <SearchDetailButton type="button" title="상세검색">
        <HiOutlineDocumentSearch style={detailSearchIconStyle} />
      </SearchDetailButton>
    </SearchWrapper>
  );
};

export default Search;
