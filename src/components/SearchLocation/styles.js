import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    margin: theme.spacing(1),
  },
  Pagination: {
    borderRadius: 5,
    marginTop: '55rem',
    padding: '1006px',
  },
  Paper: {
    marginTop: '5%',
  },

  // image: {
  //   marginLeft: '20px',
  //   sx: { display: { xs: 'none', sm: 'none' } },
  // },

  [theme.breakpoints.down('sm')]: {
    //breakpoint for mobile device compatibility
    searchBar: {
      width: '3000px',
    },
    img: {
      marginLeft: '100px',
    },
    mainContainer: {
      flexDirection: 'column-reverse',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
    },
  },
}));
