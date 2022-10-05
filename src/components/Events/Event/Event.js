import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { deleteEvent, likeEvent, getEvents } from '../../../actions/events';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import moment from 'moment';

export default function Event({ event, setCurrentId }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={event.selectedFile} title={event.selectedFile} />
      <div className={classes.overlay}>
        <Typography variant="h6"> {event.creator}</Typography>
        <Typography variant="body2">{moment(event.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          onClick={() => {
            setCurrentId(event._id);
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondayr">
          {event.tags.map((tag) => `#${tag} `)} {event.creator}
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
        <Button>
          <ThumbUpAltIcon
            fontSize="small"
            color="primary"
            onClick={() => {
              dispatch(likeEvent(event._id), getEvents());
            }}
          />
          &nbsp; Like &nbsp;
          {event.likeCount}
        </Button>
      </CardActions>
      <CardActions className={classes.CardActions}>
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
      </CardActions>
    </Card>
  );
}
