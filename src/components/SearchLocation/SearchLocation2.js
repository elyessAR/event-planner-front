import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import { getEventsByLocation } from '../../actions/events';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export const SearchLocation2 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchLocation, setSearchLocation] = useState('');
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchByLocation();
    }
  };

  const [tags, setTags] = useState([]);

  const searchByLocation = () => {
    if (searchLocation.trim()) {
      dispatch(getEventsByLocation({ searchLocation, tags }));
      console.log('searchlocationworks');
    }
  };

  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <TextField
        // disabled={true}
        name="Choose Prefered Location "
        variant="outlined"
        label="Choose Prefered Location"
        value={searchLocation}
        onKeyPress={handleKeyPress}
        onChange={(e) => {
          setSearchLocation(e.target.value);
        }}
      />
      <Button onClick={searchByLocation} className={classes.searchBotton} variant="contained" color="primary">
        Search{' '}
      </Button>
    </AppBar>
  );
};
