import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  HiArrowNarrowLeft,
  HiOutlineDocumentSearch,
  HiOutlineSearch,
} from 'react-icons/hi';

const SearchWrapper = styled.div`
  position: inherit;
  display: flex;
  width: 100%;
  height: auto;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-300);
  padding: 0 0.25rem;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
`;
const SearchForm = styled.form`
  position: relative;
  display: flex;
  flex-grow: 1;
`;
const BackButton = styled.button`
  padding: 0.25rem;
  & svg {
    width: 1.8rem;
    height: 2rem;
    color: var(--color-gray-500);
  }
`;
const SearchInput = styled.input`
  width: auto;
  padding: 0.75rem 0.25rem;
  margin-right: 0px;
  border: 1px transparent;
  flex-grow: 1;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;
const SearchButton = styled.button`
  padding: 0.25rem;
  width: 2.1rem;
  right: 0px;
  top: 0.2rem;
  & svg {
    width: 1.8rem;
    height: 2rem;
    color: var(--color-gray-500);
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

const AsideSearch = props => {
  const {
    handleClickEvent,
    handleInputKeyDown,
    handleFormSubmit,
    placeholder,
  } = props;
  // 활성화 시 자동 포커스
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });
  // input value 및 change event
  const [value, setValue] = useState('');
  const handleInputChange = e => {
    setValue(e.target.value);
  };
  return (
    <SearchWrapper>
      <BackButton type="button" title="뒤로가기" onClick={handleClickEvent}>
        <HiArrowNarrowLeft />
      </BackButton>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchInput
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={value}
          ref={inputRef}
        />
        <SearchButton type="submit" title="검색">
          <HiOutlineSearch />
        </SearchButton>
      </SearchForm>
      <LineDiv>
        <LineSpan />
      </LineDiv>
      <SearchDetailButton type="button" title="상세검색">
        <HiOutlineDocumentSearch />
      </SearchDetailButton>
    </SearchWrapper>
  );
};

export default AsideSearch;
