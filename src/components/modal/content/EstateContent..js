import { isEqual, isNull } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
`;

const BookButton = styled.button`
  padding: 0 0.2rem;
  margin-right: 0.1rem;
  background-color: ${props =>
    props.isActive ? `var(--color-gray-500)` : `var(--color-gray-300)`};
`;

const LandBook = () => {
  const { pnu } = useSelector(state => state.viewControl);
  const [landBook, setLandBook] = useState(null); // 토지대장
  useEffect(() => {
    fetch(`/estate/get-land-book/${pnu}`)
      .then(res => res.json())
      .then(json => {
        if (isEqual('success', json['_result_'])) {
          setLandBook(json.data[0]);
        } else {
          setLandBook(null);
        }
      });
  }, [pnu]);
  return (
    <>
      <table style={{ width: '100%', textAlign: 'center' }}>
        <tr>
          <th style={{ backgroundColor: `var(--color-gray-100)` }}>
            특수지구분
          </th>
          <td>{landBook?.ledgGbn}</td>
          <th style={{ backgroundColor: `var(--color-gray-100)` }}>지목</th>
          <td>{landBook?.jimokNm}</td>
          <th style={{ backgroundColor: `var(--color-gray-100)` }}>면적</th>
          <td style={{ textAlign: 'right' }}>{landBook?.parea}</td>
        </tr>
        <tr>
          <th style={{ backgroundColor: `var(--color-gray-100)` }}>소유구분</th>
          <td>{landBook?.ownGbn}</td>
          <th style={{ backgroundColor: `var(--color-gray-100)` }}>공유인수</th>
          <td style={{ textAlign: 'right' }}>{Number(landBook?.shrCnt)}</td>
          <th style={{ backgroundColor: `var(--color-gray-100)` }}>
            데이터기준일자
          </th>
          <td>{landBook?.dataYmd}</td>
        </tr>
      </table>
    </>
  );
};

const BuildingBook = () => {
  const { pnu } = useSelector(state => state.viewControl);
  const [isLoading, setLoading] = useState(true);
  const [buildingBook, setBuildingBook] = useState(null); // 건축대장
  useEffect(() => {
    setLoading(true);
    fetch(`/estate/get-building-book/${pnu}`)
      .then(res => res.json())
      .then(json => {
        if (isEqual('success', json['_result_'])) {
          setBuildingBook(json.data);
        } else {
          setBuildingBook(null);
        }
        setLoading(false);
      });
  }, [pnu]);
  return (
    <table style={{ width: '100%', textAlign: 'center' }}>
      <thead
        style={{
          backgroundColor: `var(--color-gray-100)`,
          border: `1px solid var(--color-white)`,
        }}
      >
        <tr>
          <th>종류</th>
          <th>구분</th>
          <th>주용도명</th>
          <th>주부속구분명</th>
          <th>연면적</th>
          <th>사용승인일</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={6} style={{ textAlign: 'center' }}>
              조회 중입니다.
            </td>
          </tr>
        )}
        {!isLoading && (isNull(buildingBook) || buildingBook?.length == 0) && (
          <tr>
            <td colSpan={6} style={{ textAlign: 'center' }}>
              검색결과가 없습니다.
            </td>
          </tr>
        )}
        {!isLoading &&
          buildingBook?.map((book, index) => (
            <tr
              key={index}
              style={{ border: `1px solid var(--color-gray-100)` }}
            >
              <td>{book.regstrKindNm}</td>
              <td>{book.regstrGbNm}</td>
              <td>{book.mainPurpsNm}</td>
              <td>{book.mainAtchGbNm}</td>
              <td style={{ textAlign: 'right' }}>{Number(book.totarea)}</td>
              <td>{book.useaprDay}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const OfficialPrice = () => {
  const { pnu } = useSelector(state => state.viewControl);
  const [officialPrice, setOfficialPrice] = useState(null); // 공시지가
  useEffect(() => {
    fetch(`/estate/get-official-price/${pnu}`)
      .then(res => res.json())
      .then(json => {
        if (isEqual('success', json['_result_'])) {
          setOfficialPrice(json.data);
        } else {
          setOfficialPrice(null);
        }
      });
  }, [pnu]);
  return (
    <table style={{ width: '100%', textAlign: 'center' }}>
      <thead style={{ backgroundColor: `var(--color-gray-100)` }}>
        <td>기준일자</td>
        <td>공시지가</td>
        <td>공시일자</td>
      </thead>
      <tbody>
        {(isNull(officialPrice) || officialPrice?.length == 0) && (
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
              검색결과가 없습니다.
            </td>
          </tr>
        )}
        {officialPrice?.map((price, index) => (
          <tr key={index}>
            <td>
              {price.baseYear}-{price.stmdt}
            </td>
            <td style={{ textAlign: 'right' }}>{price.jiga}</td>
            <td>{price.jigaYmd}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const IndividualPrice = () => {
  const { pnu } = useSelector(state => state.viewControl);
  const [individualPrice, setIndividualPrice] = useState(null); // 개별주택가격
  useEffect(() => {
    fetch(`/estate/get-individual-price/${pnu}`)
      .then(res => res.json())
      .then(json => {
        if (isEqual('success', json['_result_'])) {
          setIndividualPrice(json.data);
        } else {
          setIndividualPrice(null);
        }
      });
  }, [pnu]);
  return (
    <table style={{ width: '100%', textAlign: 'center' }}>
      <thead style={{ backgroundColor: `var(--color-gray-100)` }}>
        <tr>
          <th rowSpan={2}>기준일자</th>
          <th rowSpan={2}>동명</th>
          <th colSpan={2}>대지면적</th>
          <th colSpan={2}>건물연면적</th>
          <th rowSpan={2}>개별주택가격</th>
        </tr>
        <tr>
          <th>전체</th>
          <th>산정</th>
          <th>전체</th>
          <th>산정</th>
        </tr>
      </thead>
      <tbody>
        {(isNull(individualPrice) || individualPrice?.length == 0) && (
          <tr>
            <td colSpan={7} style={{ textAlign: 'center' }}>
              검색결과가 없습니다.
            </td>
          </tr>
        )}
        {individualPrice?.map((price, index) => (
          <tr key={index}>
            <td>
              {price.baseYear}-{price.stmdt}
            </td>
            <td>{price.dongNm}</td>
            <td>{price.lndbukArea}</td>
            <td style={{ textAlign: 'right' }}>{price.calcLarea}</td>
            <td style={{ textAlign: 'right' }}>{price.hprcGarea}</td>
            <td style={{ textAlign: 'right' }}>{price.resArea}</td>
            <td style={{ textAlign: 'right' }}>{price.potvale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ApartmentPrice = () => {
  const { pnu } = useSelector(state => state.viewControl);
  const [apartmentPrice, setApartmentPrice] = useState(null); // 개별주택가격
  useEffect(() => {
    fetch(`/estate/get-apartment-price/${pnu}`)
      .then(res => res.json())
      .then(json => {
        if (isEqual('success', json['_result_'])) {
          setApartmentPrice(json.data);
        } else {
          setApartmentPrice(null);
        }
      });
  }, [pnu]);
  return (
    <table style={{ width: '100%', textAlign: 'center' }}>
      <thead style={{ backgroundColor: `var(--color-gray-100)` }}>
        <td>기준일자</td>
        <td>동·호명(층수)</td>
        <td>전용면적</td>
        <td>공시가격</td>
      </thead>
      <tbody>
        {(isNull(apartmentPrice) || apartmentPrice?.length == 0) && (
          <tr>
            <td colSpan={4}>검색결과가 없습니다.</td>
          </tr>
        )}
        {apartmentPrice?.map((price, index) => (
          <tr key={index}>
            <td>
              {price.baseYear}-{price.stmdt}
            </td>
            <td>
              {price.dongNm}동 {price.hoNm}호({price.frlNm}층)
            </td>
            <td style={{ textAlign: 'right' }}>{price.privArea}</td>
            <td style={{ textAlign: 'right' }}>{price.noticeAmt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const EstateContent = () => {
  const [activeTabName, setActiveTabName] = useState('landBook');
  return (
    <div>
      <ButtonWrapper>
        <BookButton
          type="button"
          onClick={() => setActiveTabName('landBook')}
          isActive={activeTabName == 'landBook'}
        >
          토지대장
        </BookButton>
        <BookButton
          type="button"
          onClick={() => setActiveTabName('buildingBook')}
          isActive={activeTabName == 'buildingBook'}
        >
          건축물대장
        </BookButton>
        <BookButton
          type="button"
          onClick={() => setActiveTabName('officialPrice')}
          isActive={activeTabName == 'officialPrice'}
        >
          공시지가
        </BookButton>
        <BookButton
          type="button"
          onClick={() => setActiveTabName('individualPrice')}
          isActive={activeTabName == 'individualPrice'}
        >
          개별주택가격
        </BookButton>
        <BookButton
          type="button"
          onClick={() => setActiveTabName('apartmentPrice')}
          isActive={activeTabName == 'apartmentPrice'}
        >
          공동주택가격
        </BookButton>
      </ButtonWrapper>
      <div style={{ overflowY: 'auto' }}>
        {
          /* content area */
          {
            landBook: <LandBook />,
            buildingBook: <BuildingBook />,
            officialPrice: <OfficialPrice />,
            individualPrice: <IndividualPrice />,
            apartmentPrice: <ApartmentPrice />,
          }[activeTabName]
        }
      </div>
    </div>
  );
};

export default EstateContent;
