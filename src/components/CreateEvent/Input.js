import React from 'react';
import { Avatar, TextField, Paper, Grid, IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, label, handleChange, autoFocus, type, handleShowPassword, half }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        variant="outlined"
        required
        fullWidth
        handleChange={handleChange}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>{type === 'password' ? <Visibility /> : <VisibilityOff />}</IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};
export default Input;
