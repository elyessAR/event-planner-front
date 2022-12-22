import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppBar, TextField, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import { getEventsByLocation } from '../../actions/events';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const API_endpoint = 'https://api.openweathermap.org/data/2.5/weather?';
const API_key = process.env.REACT_APP_API_KEY;

export const SearchLocation = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const countryCodes = require('country-codes-list');

  const myCountryCodesObject = countryCodes.customList('countryCode', ' {countryNameEn}');

  useSelector((state) => {
    console.log(state?.position?.positionData?.coords?.latitude);

    axios
      .get(
        `${API_endpoint}lat=${state?.position?.positionData?.coords?.latitude}&lon=${state?.position?.positionData?.coords?.longitude}&appid=${API_key}&lang={en}`
      )
      .then((response) => {
        // setSearchLocation(response?.data.name);
        setSearchLocation(myCountryCodesObject[response?.data.sys.country]);
      });
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsByLocation({ searchLocation }));
  }, [dispatch, searchLocation]);

  return (
    <div>
      <AppBar className={classes.appBarSearch} position="static" color="inherit">
        <TextField
          disabled={true}
          name="current location"
          variant="outlined"
          label="Current location"
          value={searchLocation}
          // onKeyPress={handleKeyPress}
          onChange={(e) => {
            setSearchLocation(e.target.value);
          }}
        />
        <Typography variant="h6"> Looking for events in {searchLocation}? we will make sure you find the hottest events nearby!</Typography>
      </AppBar>
    </div>
  );
};
