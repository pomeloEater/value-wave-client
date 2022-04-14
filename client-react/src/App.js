import React from 'react';
// import MapContainer from './map/MapContainer';
// import Sidenav from './components/Sidenav';

const App = () => {
  return (
    <>
      <aside class="absolute z-10 w-1/5 h-full bg-white border-r shadow-md">
        <div>
          <form class="flex w-full p-5">
            <span class="flex items-center justify-center p-1 bg-white border-t border-b border-l border-gray-400 rounded-l-lg">
              로고
            </span>
            <input
              class="flex-auto p-4 mr-0 text-gray-300 bg-white border-t border-b border-gray-400 focus:outline-none focus:text-gray-800"
              placeholder="건물명, 지번, 도로명 검색"
            />
            <button
              type="submit"
              class="p-1 bg-white border-t border-b border-gray-400"
            >
              검색
            </button>
            <button
              type="button"
              class="p-1 bg-white border-t border-b border-r border-gray-400 rounded-r-lg"
            >
              상세
              <br />
              검색
            </button>
          </form>
        </div>
        <div></div>
      </aside>
      <nav class="absolute z-10 w-full text-center top-5">
        <span
          id="centerAddressText"
          class="inline-block h-8 px-3 py-0 text-xs font-semibold leading-8 bg-white shadow-md rounded-3xl"
        >
          경기도 성남시 수정구 시흥동
        </span>
      </nav>
      <aside class="absolute z-10 top-5 right-5">
        <ul class="flex flex-col items-end gap-3">
          <li
            class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
            id="mapMyLoc"
            title="내 위치 보기"
          >
            위치
          </li>
          <li
            class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
            id="mapZoomIn"
            title="확대"
          >
            +
          </li>
          <li
            class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
            id="mapZoomOut"
            title="축소"
          >
            -
          </li>
          <li
            class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
            id="mapLayers"
            title="지도"
          >
            지도
            <ul class="invisible absolute right-12 top-[9.75rem] flex flex-row justify-end w-36 gap-3 leading-10 text-center shadow-sm h-10">
              <li
                class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
                id="mapBaseHybrid"
                title="스카이뷰"
              >
                위성
              </li>
              <li
                class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
                id="mapBaseUseDistrict"
                title="지적편집도"
              >
                지적
              </li>
              <li
                class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
                id="mapBaseTerrain"
                title="지형도"
              >
                지형
              </li>
            </ul>
          </li>

          <li
            class="w-10 h-10 leading-10 text-center bg-white border border-gray-400 rounded-md shadow-sm"
            id="mapRoadview"
          >
            로드
          </li>
        </ul>
      </aside>
      <div class="w-full h-full">
        <div id="mapContainer" style={{ width: '100%', height: '100%' }}></div>
        <div
          id="roadviewContainer"
          style={{ width: '50%', height: '100%', float: 'left' }}
        ></div>
      </div>
    </>
  );
};

export default App;
