import React, { useState } from 'react';
import Event from './Event/Event';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Events = ({ setCurrentId, searchData }) => {
  const { events, isLoading } = useSelector((state) => state.events);
  const [rows, setRows] = useState(events);

  // let filteredRows = events.filter((event) => {
  //   return event.title.toLowerCase().includes(searchData.toLowerCase());
  // });

  const classes = useStyles();

  if (!events.length && !isLoading) return 'No current events in your area, be the first one to organize something of a value!';

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={2}>
      {events.map((event) => (
        <Grid key={event._id} item xs={12} sm={12} md={6} lg={4}>
          <Event event={event} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Events;
