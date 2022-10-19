import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 1,
    margin: '15px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '600px',
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
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
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
    img: {
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
