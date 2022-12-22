import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 5,
    margin: '6px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
  },
  img: {
    height: '50px',
    width: '200',
  },
  IconButton: {
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
    },
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '85%',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: deepPurple[500],
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
      display: 'none',
    },
    profileMob: {
      display: 'flex',
      width: '80px',
      justifyContent: 'center',
    },

    heading: { width: 120 },
    variant: 'h9',
  },
}));
