import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { getPosition } from './actions/position';
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { Auth } from './components/Auth/Auth';
import { EventDetails } from './components/EventDetails/EventDetails';
import { CreateEvent } from './components/CreateEvent/CreateEvent';

import { Reception } from './components/Reception/Reception';

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [isSignup, setIsSignup] = useState(false);

  const [searchData, setSearchData] = useState('');
  const cancelSearch = () => {
    setSearchData('');
  };
  useEffect(() => {
    console.log('useeffectwork');
    dispatch(getPosition());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar setIsSignup={setIsSignup} setSearchData={setSearchData} cancelSearch={cancelSearch} />

      <div>
        <Routes>
          <Route path="/" element={<Reception />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/events" element={<Home searchData={searchData} />} />
          <Route path="/events/search" element={<Home />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/auth" element={!user ? <Auth isSignup={isSignup} setIsSignup={setIsSignup} /> : <Navigate replace to="/events" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
