import React, { useState } from 'react';
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { Auth } from './components/Auth/Auth';

const App = () => {
  const [searchData, setSearchData] = useState('');
  const cancelSearch = () => {
    setSearchData('');
  };
  // const handleCallback = (childData) => {};
  console.log(searchData);

  return (
    <BrowserRouter>
      <Container maxidth="lg">
        <Navbar setSearchData={setSearchData} cancelSearch={cancelSearch} />
        <Routes>
          <Route path="/" element={<Home searchData={searchData} />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
