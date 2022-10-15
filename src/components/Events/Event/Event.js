import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { deleteEvent, likeEvent, getEvents } from '../../../actions/events';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import moment from 'moment';

export default function Event({ event, setCurrentId }) {
  const test = '6348d16b29a1f7e70d3bd491';

  const dispatch = useDispatch();

  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(`this is ${user?.result?._id} and ${event.creator} `);

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
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={event.selectedFile} title={event.selectedFile} />
      <div className={classes.overlay}>
        <Typography variant="h6"> {event.name}</Typography>
        <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === event?.creator || user?.result?._id === event?.creator) && (
        <div className={classes.overlay2}>
          <Button onClick={() => setCurrentId(event._id)} style={{ color: 'white' }} size="small">
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
      </CardContent>
      <CardActions className={classes.CardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likeEvent(event._id))}>
          <Likes />
        </Button>
      </CardActions>
      <CardActions className={classes.CardActions}>
        {(user?.result?.googleId === event?.creator || user?.result?._id === event?.creator) && (
          <Button>
            <DeleteIcon
              fontSize="small"
              color="primary"
              onClick={() => {
                dispatch(deleteEvent(event._id));
              }}
            />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
