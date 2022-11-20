import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, TextField, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import { getEventsByLocation } from '../../actions/events';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { contryCodes } from 'country-codes-list';

const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?';
const API_key = 'd548a44f4a3781d10b66cb4f2cf6b87c';

export const SearchLocation = () => {
  const countryCodes = require('country-codes-list');

  const myCountryCodesObject = countryCodes.customList('countryCode', ' {countryNameEn}');
  console.log(myCountryCodesObject.TN);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  console.log(events);

  const [searchLocation, setSearchLocation] = useState('');
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchByLocation();
    }
  };

  const [tags, setTags] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    async function fetchData() {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
    fetchData();
  }, []);

  const searchByLocation = useCallback(() => {
    if (searchLocation.trim()) {
      dispatch(getEventsByLocation({ searchLocation, tags }));
      // if (!events.length) {
      //   console.log('NOO EVENTS');
      //   setSearchLocation(myCountryCodesObject.TN);
      //   searchByLocation();
      // }
    }
  }, [dispatch, searchLocation, tags, events.length, myCountryCodesObject.TN]);

  // if (!events.length) {
  //   setSearchLocation(myCountryCodesObject.TN);
  //   searchByLocation();
  // }

  useEffect(() => {
    if (latitude & longitude) {
      axios.get(`${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}&lang={en}`).then((response) => {
        setCountry(response?.data.sys.country);
        setSearchLocation(response?.data.name);
        searchByLocation();
      });
    }
  }, [searchByLocation, longitude, latitude]);

  return (
    <div>
      <AppBar className={classes.appBarSearch} position="static" color="inherit">
        <TextField
          disabled={true}
          name="current location"
          variant="outlined"
          label="Current location"
          value={searchLocation}
          onKeyPress={handleKeyPress}
          onChange={(e) => {
            setSearchLocation(e.target.value);
          }}
        />
        <Typography variant="h6"> Looking for events in {searchLocation}? we will make sure you find the hottest events nearby!</Typography>
      </AppBar>
    </div>
  );
};
