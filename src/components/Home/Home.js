import { Container, Grow, Grid } from '@material-ui/core';
import Events from '../Events/Events';
import Form from '../form/Form';
import React, { useState, useEffect, useMemo } from 'react';
import { getEvents, deleteEvent } from '../../actions/events';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

export default function Home() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [currentId, dispatch]);

  return (
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
  );
}
