import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    searchBar: {
      height: 35,
      width: 700,
      align: 'center',
    },
  },
}));
