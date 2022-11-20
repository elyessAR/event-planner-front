import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import { deleteEvent, likeEvent, getEvents } from '../../../actions/events';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import moment from 'moment';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDayNames = ['Mon', 'Tue', 'Wed', 'Th', 'Fri', 'Sat', 'Sun'];

export default function Event({ event, setCurrentId }) {
  const D = new Date(event.startingDate);

  const test = '6348d16b29a1f7e70d3bd491';
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const openEvent = () => {
    navigate(`/events/${event._id}`);
  };

  const Likes = () => {
    if (event.likes.length > 0) {
      return event.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {event.likes.length > 2 ? `You and ${event.likes.length - 1} others` : `${event.likes.length} like${event.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{event.likes.length} {event.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        onClick={openEvent}
      >
        <CardMedia className={classes.media} image={event.selectedFile} title={event.selectedFile} />

        <div className={classes.overlay}>
          <Typography variant="h6"> {event.name}</Typography>
          {/* <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography> */}

          <Typography variant="body2" variant="h6">
            Location: {event.location ? event.location : `Online Event`}
          </Typography>
        </div>
        {(user?.result?.googleId === event?.creator || user?.result?._id === event?.creator) && (
          <div className={classes.overlay2}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(event._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondayr">
            {event.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {event.title}
        </Typography>
        <CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {event.message}
            </Typography>
          </CardContent>
          <Typography variant="body2" variant="h6">
            When: {weekDayNames[D.getDay()]}, {monthNames[D.getMonth()]} {D.getDate()}, {D.getHours()}:{D.getMinutes()}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likeEvent(event._id))}>
          <Likes />
        </Button>
      </CardActions>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === event?.creator || user?.result?._id === event?.creator) && (
          <Button
            color="secondary"
            onClick={() => {
              dispatch(deleteEvent(event._id));
            }}
          >
            Cancel Event
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
