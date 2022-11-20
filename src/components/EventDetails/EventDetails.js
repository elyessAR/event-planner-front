import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { getEvent, getEventsBySearch } from '../../actions/events';

export const EventDetails = () => {
  const { event, events, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEvent(id));
  }, [id]);
  useEffect(() => {
    if (event) {
      dispatch(getEventsBySearch({ search: 'none', tags: event?.tags.join(',') }));
    }
  }, [event]);

  if (!event) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  const recommendedEvents = events.filter(({ _id }) => _id !== event._id);

  const openEvent = (_id) => {
    navigate(`/events/${_id}`);
  };

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {event.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {event.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {event.message}
          </Typography>
          <Typography variant="h6">Created by: {event.name}</Typography>
          <Typography variant="body1">{moment(event.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={event.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            alt={event.title}
          />
        </div>
      </div>
      {recommendedEvents.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedEvents}>
            {recommendedEvents.map(({ title, message, name, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openEvent(_id)} key={_id}>
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {message}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {likes.length}
                </Typography>
                <img src={selectedFile} alt="" width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};
