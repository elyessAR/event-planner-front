import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  Button: {
    position: 'absolute',
  },
  img: {
    width: '100%',
    height: '500px',
  },

  userName: {
    display: 'flex',
    alignItems: 'center',
  },

  purple: {
    color: deepPurple[500],
  },
  overlay: {
    position: 'absolute ',
    top: '500px',
    left: '80px',
    color: 'white',
  },
  overlay2: {
    top: '450px',
    left: '80px',
    color: 'white',
    height: '50px',
  },
  [theme.breakpoints.down('sm')]: {
    //breakpoint for mobile device compatibility
    appBarMob: {
      margin: '15px -20px',
      borderRadius: 2,
      height: 70,
      width: 402,
    },

    searchBar: {
      height: 35,
      width: 700,
      align: 'center',
    },
    userNameMob: {
      display: 'none',
    },
    imgMb: {
      width: '100%',
      height: '500px',
    },
    profileMob: {
      display: 'flex',
      width: '80px',
      justifyContent: 'center',
    },

    heading: { width: 120 },
    variant: 'h9',
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    margin: theme.spacing(1),
  },

  [theme.breakpoints.down('sm')]: {
    //breakpoint for mobile device compatibility
    overlayMob: {
      position: 'absolute ',
      top: '500px',
      left: '50px',
      color: 'white',
    },
    overlayMob2: {
      top: '450px',
      left: '50px',
      color: 'white',
      height: '40px',
    },
    searchBar: {
      width: '3000px',
    },

    mainContainer: {
      flexDirection: 'column-reverse',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
    },
  },
}));
