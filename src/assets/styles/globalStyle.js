/**
 * globalStyle.js
 * author: owen
 * date: 2022-04-20
 * description: styled-components의 전역변수
 *  디자인템플릿 가이드_ver1의 색상을 사용함
 */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary-black: #343134;
    --color-primary-blue: #025da4;
    --color-primary-red: #e2572f;
    --color-secondary-skyblue: #f1f4fb;
    --color-secondary-beige: #c5bcac;
    --color-gray-600: #565656;
    --color-gray-500: #858585;
    --color-gray-400: #d6d6d6;
    --color-gray-300: #e2e2e2;
    --color-gray-200: #eeeeee;
    --color-gray-100: #f5f5f5;
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: rgb(31 41 55)
  }

  h1 {
    
  }
`;

export default GlobalStyle;
