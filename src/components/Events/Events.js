import React, { useState } from 'react';
import Event from './Event/Event';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

import { Grid, CircularProgress, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

const Events = ({ setCurrentId, searchData }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const { events, isLoading } = useSelector((state) => state.events);
  const navigate = useNavigate();

  const nav = () => {
    if (user) {
      navigate('/createEvent');
    } else {
      navigate('/auth');
    }
  };

  const classes = useStyles();

  if (!events.length && !isLoading)
    return (
      <div>
        <div>No current events in your area, be the first one to organize something of a value! </div>
        <Button onClick={nav} fontSize="small" edge="false">
          New Event
          <AddIcon fontSize="large"></AddIcon>
        </Button>
      </div>
    );

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
