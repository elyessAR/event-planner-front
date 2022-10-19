import React, { useState } from 'react';
import Event from './Event/Event';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Events = ({ setCurrentId, searchData }) => {
  const events = useSelector((state) => state.events);
  const [rows, setRows] = useState(events);

  console.log(searchData);

  let filteredRows = events.filter((event) => {
    return event.title.toLowerCase().includes(searchData.toLowerCase());
  });

  const classes = useStyles();

  return !events.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {filteredRows.map((event) => (
        <Grid key={event._id} item xs={12} sm={6} md={4}>
          <Event event={event} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Events;
