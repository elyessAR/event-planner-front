import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import useStyles from './styles';
import eventImage from '../../images/event-image.png';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inhirit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          style={{
            color: 'rgba(0,183,255, 1)',
          }}
          variant="h5"
          align="center"
        >
          Event Planner
        </Typography>
      </div>
      <SearchBar
        className={classes.searchBar}
        // onChange={handleChange}
        // onRequestSearch={handleClick}
      />
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained " color="primary ">
            sign in
          </Button>
        )}
      </Toolbar>
      <img className={classes.img} src={eventImage} alt="events" height="100" />
    </AppBar>
  );
}
