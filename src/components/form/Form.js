import React, { useState, useEffect, Fragment } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent, getEvents } from "../../actions/events";
import { useNavigate } from "react-router-dom";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { City, Country, State } from "country-state-city";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { Stack, Autocomplete } from "@mui/material";

import DateFnsUtils from "@date-io/date-fns";

export default function Form({ currentId, setCurrentId }) {
  const provider = new OpenStreetMapProvider();
  const searchControl = new GeoSearchControl({
    provider: provider,
  });
  const [selectedStartingDate, handleStartingDateChange] = useState(null);
  const [selectedEndingDate, handleEndingDateChange] = useState(null);

  const [value, setValue] = useState("");
  const [places, setPlaces] = useState([]);
  const handleSelect = async (value) => {};

  const countries = Country.getAllCountries();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [eventData2, setEventData2] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    startingDate: "",
    endingDate: "",
    location: "",
  });
  const event = useSelector((state) =>
    currentId ? state.events.events.find((e) => e._id === currentId) : null
  );

  const classes = useStyles();
  useEffect(() => {
    if (event) setEventData(event);
  }, [event]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updateEvent(currentId, { ...eventData2, name: user?.result?.name })
      );
    } else {
      dispatch(
        createEvent({ ...eventData2, name: user?.result?.name }, navigate)
      );
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to organize your own events and like other's events.
        </Typography>
      </Paper>
    );
  }
  const clear = () => {
    setCurrentId(null);
    setEventData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      location: "",
      startingDate: "",
      endingDate: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        novalidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} an event{" "}
        </Typography>

        <TextField
          required
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={currentId ? event?.title : eventData2.title}
          onChange={(e) =>
            setEventData2({ ...eventData2, title: e.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={currentId ? event?.message : eventData2.message}
          onChange={(e) =>
            setEventData2({ ...eventData2, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={currentId ? event?.tags : eventData2.tags}
          onChange={(e) =>
            setEventData2({ ...eventData2, tags: e.target.value.split(",") })
          }
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            required
            autoOk
            variant="inline"
            minDate={new Date()}
            inputVariant="outlined"
            label="Event Starts"
            format="yyyy/MM/dd HH:mm"
            value={currentId ? event?.startingDate : selectedStartingDate}
            onChange={(date) => {
              handleStartingDateChange(date);
              setEventData2({ ...eventData2, startingDate: date });
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
            value={currentId ? event?.endingDate : selectedEndingDate}
            onChange={(date) => {
              handleEndingDateChange(date);
              setEventData2({ ...eventData2, endingDate: date });
            }}
          />
        </MuiPickersUtilsProvider>

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
            renderInput={(params) => (
              <TextField {...params} label="Event Location" />
            )}
            onInputChange={(event, newInputValue) => {
              setValue(newInputValue);
              setEventData2({ ...eventData2, location: newInputValue });
            }}
            freeSolo
          />
        </Stack>

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setEventData2({ ...eventData2, selectedFile: base64 })
            }
          />
        </div>
        <Button variant="contained" color="primary" size="large " type="submit">
          {" "}
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small "
          onClick={clear}
        >
          {" "}
          Clear
        </Button>
      </form>
    </Paper>
  );
}
