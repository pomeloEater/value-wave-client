/**
 * HeaderSearch.js
 * author: owen
 * date: 2022-04-19
 * description: 메인-좌측 검색 영역
 */
import React from 'react';
import styled from 'styled-components';
import { toggleSearch } from 'slices/viewControlSlice';
import { HiOutlineDocumentSearch, HiOutlineSearch } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

/* elements */
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 3rem;
  background-color: white;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.5rem;
  padding: 0 0.25rem;
  justify-content: space-between;
  box-shadow: var(--shadow-md);
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
  padding: 0.25rem;
  margin-right: 0px;
  border: 1px transparent;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;
const SearchButton = styled.button`
  padding: 0.25rem;
  width: 2.1rem;
  & svg {
    width: 1.8rem;
    height: 2rem;
    color: var(--color-gray-300);
  }
`;
const LineDiv = styled.div`
  margin: auto 0.25rem;
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
  & svg {
    width: 1.8rem;
    height: 2rem;
  }
`;

/* components */
const HeaderSearch = () => {
  const dispatch = useDispatch();
  const handleClickEvent = () => {
    dispatch(toggleSearch());
  };

  return (
    <SearchWrapper>
      <LogoWrapper title="value-wave">로고</LogoWrapper>
      <SearchInput
        type="text"
        placeholder="건물명, 지번, 도로명 검색"
        onClick={handleClickEvent}
        readOnly="readOnly"
      />
      <SearchButton type="submit" title="검색">
        <HiOutlineSearch />
      </SearchButton>
      <LineDiv>
        <LineSpan />
      </LineDiv>
      <SearchDetailButton type="button" title="상세검색">
        <HiOutlineDocumentSearch />
      </SearchDetailButton>
    </SearchWrapper>
  );
};

export default HeaderSearch;
