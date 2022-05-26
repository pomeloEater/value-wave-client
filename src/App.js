import React from 'react';
import Main from 'pages/Main';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
      <div id="modal-root"></div>
    </>
  );
};

export default App;
