import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent, getEvents } from '../../actions/events';

export default function Form({ currentId, setCurrentId }) {
  const dispatch = useDispatch();

  const [eventData, setEventData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const event = useSelector((state) =>
    currentId ? state.events.find((e) => e._id === currentId) : null
  );

  const classes = useStyles();
  useEffect(() => {
    if (event) setEventData(event);
  }, [event]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateEvent(currentId, eventData));
    } else {
      dispatch(createEvent(eventData));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setEventData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        novalidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} an event </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={eventData.creator}
          onChange={(e) => setEventData({ ...eventData, creator: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={eventData.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={eventData.message}
          onChange={(e) => setEventData({ ...eventData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={eventData.tags}
          onChange={(e) => setEventData({ ...eventData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setEventData({ ...eventData, selectedFile: base64 })}
          />
        </div>
        <Button variant="contained" color="primary" size="large " type="submit">
          {' '}
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small " onClick={clear}>
          {' '}
          Clear
        </Button>
      </form>
    </Paper>
  );
}
