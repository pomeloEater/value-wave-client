/**
 * Search.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 검색 영역
 */
import React from 'react';
import styled from 'styled-components';
import { toggleSearch } from 'slices/viewControlSlice';
import { HiOutlineDocumentSearch, HiOutlineSearch } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

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
const SearchDiv = styled.div`
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
  const dispatch = useDispatch();
  const handleClickEvent = () => {
    dispatch(toggleSearch());
  };

  return (
    <SearchWrapper>
      <LogoWrapper title="value-wave">로고</LogoWrapper>
      <SearchDiv>
        <SearchInput
          type="text"
          placeholder="건물명, 지번, 도로명 검색"
          onClick={handleClickEvent}
        />
        <SearchButton type="submit" title="검색">
          <HiOutlineSearch style={searchIconStyle} />
        </SearchButton>
      </SearchDiv>
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
