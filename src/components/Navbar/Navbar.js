import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import useStyles from './styles';
import eventImage from '../../images/event-image.png';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import eventoLogo from '../../images/eventoLogo.png';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar({ setSearchData, cancelSearch }) {
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
  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  const nav = () => {
    if (user) {
      navigate('/createEvent');
    } else {
      navigate('/auth');
    }
  };

  return (
    <AppBar onChange={handleChange} color="primary" className={`${classes.appBar} `} position="static" color="inhirit">
      <div className={classes.brandContainer}>
        <Link to="/" className={classes.brandContainer}>
          <img component={Link} to="/" src={eventoLogo} alt="icon" height="55px" />
        </Link>
      </div>

      <Toolbar className={classes.toolbar}>
        <Button onClick={nav} fontSize="small" edge="false">
          New Event
          <AddIcon fontSize="large"></AddIcon>
        </Button>
        {user ? (
          <div className={`${classes.profile} ${classes.profileMob}`}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={`${classes.userName} ${classes.userNameMob}`} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} onClick={logout}>
              logout
            </Button>
          </div>
        ) : (
          <>
            <Button component={Link} className={classes.purple} to="/auth" variant="contained " color="secondary ">
              sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
