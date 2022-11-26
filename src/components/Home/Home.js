import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Events from '../Events/Events';
import Form from '../form/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import ChipInput from 'material-ui-chip-input';
import { getEvents, getEventsBySearch, deleteEvent, getEventsByLocation } from '../../actions/events';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination';
import axios from 'axios';
import { SearchLocation } from '../SearchLocation/SearchLocation';
import { SearchLocation2 } from '../SearchLocation/SearchLocation2';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home({ searchData }) {
  const [currentId, setCurrentId] = useState(null);

  // const [searchedData, setSearchedData] = useState(null);
  // setSearchedData(searchData);

  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery  ');
  const [search, setSearch] = useState('');

  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search event
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const searchEvent = () => {
    if (search.trim()) {
      console.log('searchevent');
      dispatch(getEventsBySearch({ search, tags: tags.join(',') }));
      // navigate(`/events/search?searchQuery=${search || 'none'}$ tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spcing={3} className={classes.mainContainer}>
          <Grid items xs={12} sm={7} md={9}>
            <Events setCurrentId={setCurrentId} searchData={searchData} />
          </Grid>
          <Grid items xs={12} sm={4} md={3}>
            <SearchLocation />
            <SearchLocation2 />

            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        <Grid className={classes.Grid}>
          <Paper elevation={6} className={classes.Paper}>
            <Pagination className={classes.Pagination} page={page} />
          </Paper>
        </Grid>
      </Container>
    </Grow>
  );
}
