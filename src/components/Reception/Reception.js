import React from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@material-ui/core';
import homeImage from '../../images/Home.png';
import Home from '../Home/Home';
import ReceptionHome from './ReceptionHome';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';

export const Reception = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div>
      <Button
        className={`${classes.overlay} ${classes.overlayMob}`}
        onClick={() => {
          navigate(`/events`);
        }}
        variant="contained"
        color="secondary"
      >
        Find Events near you
      </Button>
      <img src={homeImage} resizeMode="cover" class={classes.img} alt="events" />
      <ReceptionHome />
    </div>
  );
};
