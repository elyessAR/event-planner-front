import React, { useState, useEffect, useMemo } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { getEvents, deleteEvent } from './actions/events';
import eventImage from './images/event-image.png';
import Events from './components/Events/Events';
import Form from './components/form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import SearchBar from 'material-ui-search-bar';

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [currentId, dispatch]);

  return (
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inhirit">
        <Typography
          className={classes.heading}
          style={{
            color: 'rgba(0,183,255, 1)',
          }}
          variant="h5"
          align="center"
        >
          Event Planner
        </Typography>
        <SearchBar
          className={classes.searchBar}
          // onChange={handleChange}
          // onRequestSearch={handleClick}
          style={{
            width: '300px',
            minWidth: '20px',
            marginLeft: '30px',
          }}
        />
        <img className={classes.image} src={eventImage} alt="events" height="100" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spcing={3}
            className={classes.mainContainer}
          >
            <Grid items xs={12} sm={7}>
              <Events setCurrentId={setCurrentId} />
            </Grid>
            <Grid items xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
