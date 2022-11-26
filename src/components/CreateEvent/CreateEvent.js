import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Grid, Typography, Container } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { createEvent } from '../../actions/events';

import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

import { Stack, Autocomplete } from '@mui/material';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export const CreateEvent = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const provider = new OpenStreetMapProvider();

  const searchControl = new GeoSearchControl({
    provider: provider,
  });
  const [eventData, setEventData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    startingDate: '',
    endingDate: '',
    location: '',
  });
  const [selectedStartingDate, handleStartingDateChange] = useState(null);
  const [selectedEndingDate, handleEndingDateChange] = useState(null);
  const [value, setValue] = useState('');
  const [places, setPlaces] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);

    dispatch(createEvent({ ...eventData, name: user?.result?.name }, navigate));
  };

  useEffect(() => {
    if (!user?.result?.name) {
      navigate(`/auth`);
    }
  }, []);

  return (
    <Container component="main" maxWidth="m" className={classes.container}>
      <Paper className={classes.paper} elevation={0}>
        <Typography variant="h5"> </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h6" className={classes.typography}>
            Basic Info:{' '}
          </Typography>

          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={eventData.title}
            onChange={(e) => {
              console.log('onchangeworks');
              setEventData({ ...eventData, title: e.target.value });
            }}
            autoFocus
          />

          <TextField
            name="message"
            fullWidth
            label="Message"
            variant="outlined"
            value={eventData.message}
            onChange={(e) => setEventData({ ...eventData, message: e.target.value })}
          />

          <Typography variant="h6" className={classes.typography}>
            Tags:{' '}
          </Typography>
          <Typography variant="h8" className={classes.typography}>
            Improve discoverability of your event by adding tags relevant to this event.{' '}
          </Typography>

          <TextField
            name="tags"
            label="Tags"
            variant="outlined"
            value={eventData.tags}
            onChange={(e) => setEventData({ ...eventData, tags: e.target.value.split(',') })}
          />

          <Typography variant="h6" className={classes.typography}>
            Date and time:{' '}
          </Typography>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              required
              autoOk
              variant="inline"
              minDate={new Date()}
              inputVariant="outlined"
              label="Event Starts"
              format="yyyy/MM/dd HH:mm"
              value={selectedStartingDate}
              onChange={(date) => {
                handleStartingDateChange(date);
                setEventData({ ...eventData, startingDate: date });
              }}
            />
            <KeyboardDateTimePicker
              required
              autoOk
              variant="inline"
              minDate={new Date()}
              inputVariant="outlined"
              label="Event Ends "
              format="yyyy/MM/dd HH:mm"
              value={selectedEndingDate}
              onChange={(date) => {
                handleEndingDateChange(date);
                setEventData({ ...eventData, endingDate: date });
              }}
            />
          </MuiPickersUtilsProvider>

          <Typography variant="h6" className={classes.typography}>
            Location:{' '}
          </Typography>

          <Stack
            required
            value={value}
            onChange={(e) => {
              provider.search({ query: e.target.value }).then(function (result) {
                setPlaces(result);
              });
            }}
            spacing={2}
            width="250px"
          >
            <Autocomplete
              required
              inputValue={value}
              options={places}
              renderInput={(params) => <TextField {...params} label="Event Location" />}
              onInputChange={(event, newInputValue) => {
                setValue(newInputValue);
                console.log(newInputValue);
                setEventData({ ...eventData, location: newInputValue });
              }}
              freeSolo
            />
          </Stack>
          <Typography variant="h6" className={classes.typography}>
            Thumbnail{' '}
          </Typography>

          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setEventData({ ...eventData, selectedFile: base64 })} />
          </div>

          <Button color="primary" variant="contained" type="submit" size="large ">
            Create Event{' '}
          </Button>

          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
