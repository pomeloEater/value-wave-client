/**
 * globalStyle.js
 * author: owen
 * date: 2022-04-20
 * description: styled-components의 전역변수
 */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-black: #000000;
    --color-gray-900: #272727;
    --color-gray-700: #565656;
    --color-gray-500: #c4c4c4;
    --color-gray-300: #e2e2e2;
    --color-gray-100: #f5f5f5;
    --color-white: #ffffff;

    --color-primary-black: #343134;
    --color-primary-blue: #025da4;
    --color-primary-red: #e2572f;
    --color-secondary-skyblue: #f1f4fb;
    --color-secondary-beige: #c5bcac;

    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shaodw-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-none: box-shadow: 0 0 #0000;
  }
  
  html, body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }

  body {
    min-width: 320px;
    height: 100vh;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Pretendard';
  }

  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: rgb(31 41 55);
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 384px auto;
    @media screen and (max-width: 640px) {
      grid-template-columns: auto;
    }
  }

  h1 {
    font-family: 'Pretendard';
    font-weight: 800;
    font-size: 40px;
    /* line-height: 48px; */
  }
  h2 {
    font-family: 'Pretendard';
    font-weight: 800;
    font-size: 32px;
    /* line-height: 38px; */
  }
  h3 {
    font-family: 'Pretendard';
    font-weight: 800;
    font-size: 24px;
    /* line-height: 29px; */
  }
  h4 {
    font-family: 'Pretendard';
    font-weight: 800;
    font-size: 20px;
    /* line-height: 24px; */
  }
  h5 {
    font-family: 'Pretendard';
    font-weight: 300;
    font-size: 14px;
    /* line-height: 17px; */
  }
  h6 {
    font-family: 'Pretendard';
    font-weight: 300;
    font-size: 12px;
    /* line-height: 14px; */
  }
`;

export default GlobalStyle;
