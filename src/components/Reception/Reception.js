import React from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Grid } from '@material-ui/core';
import homeImage from '../../images/Home.png';
import Home from '../Home/Home';
import ReceptionHome from './ReceptionHome';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { BannerContainer, BannerContent, BannerDescription, BannerShopButton, BannerTitle } from './bannerStyles.js';

export const Reception = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div>
      <BannerContainer>
        <BannerContent>
          <BannerTitle variant="h1" color="secondary">
            Discover Events{' '}
          </BannerTitle>

          <BannerDescription variant="h6">
            Evenement is a web application with the purpose of connecting people with similair intrests and hobbies throught events and concerts to
            interact and create social communities.
          </BannerDescription>

          <BannerShopButton
            onClick={() => {
              navigate(`/events`);
            }}
            color="primary"
          >
            Events near you
          </BannerShopButton>
        </BannerContent>
      </BannerContainer>
      <br />

      <ReceptionHome />
    </div>
  );
};
