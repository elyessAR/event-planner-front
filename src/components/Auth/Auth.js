import React, { useState, ueuseEffect } from 'react';
import { Avatar, Button, TextField, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from './icon';
import useStyles from './styles';
import { gapi } from 'gapi-script';
import { signin, signup } from '../../actions/auth';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export const Auth = ({ isSignup, setIsSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const switchMode = () => {
    isSignup ? setIsSignup(false) : setIsSignup(true);
    console.log(isSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log('successs');
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
      console.log('nav');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('google sign in was unsuccessful');
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sign In'} </Typography>
        <form className={classes.form} onChange={handleChange} onSubmit={handleSubmit}>
          <Grid Container spacing={2}>
            {isSignup && (
              <>
                <div className={classes.userName}>
                  <Input name="firstName" label="First Name" onChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" onChange={handleChange} half />
                </div>
              </>
            )}
            <Input name="email" label="Email Address" onChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" />}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign in '}
          </Button>
          <GoogleLogin
            clientId="748340784551-egr7i8ksq87v037div9kbv2h4f2kndl9.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
            isSigned
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? 'Already have an account ? Sign In' : 'Dont have an account ? Sign Up'}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
