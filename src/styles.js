import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  img: {
    position: 'absolute',
  },

  appBar: {
    borderRadius: 15,
    margin: '15px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    marginLeft: '20px',
    sx: { display: { xs: 'none', sm: 'none' } },
  },
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
