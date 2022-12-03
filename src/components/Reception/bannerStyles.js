import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from '../../theme';
import homeImage from '../../images/eventHome.png';

export const BannerContainer = styled(Box)(({ matches, theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: '0px 0px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  backgroundImage: `url(${homeImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));

export const BannerContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '20px',
}));

export const BannerImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  // backgroundImage: `url(${src})`,
  // backgroundRepeat: "no-repeat",
  // backgroundPosition: "center",
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '320px',
    height: '300px',
  },
}));

export const BannerTitle = styled(Typography)(({ matches, theme }) => ({
  color: Colors.white,
  lineHeight: 1.5,
  fontSize: '60px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '40px',
  },
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  color: Colors.white,

  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: '3em',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}));

export const BannerShopButton = styled(Button, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== 'color',
  name: 'EventButton',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [styles.root, props.color === 'primary' && styles.primary, props.color === 'secondary' && styles.secondary],
})(({ theme }) => ({
  maxWidth: '15%',
  maxHeight: '15%',
  backgroundColor: Colors.purple,
  padding: '20px 0px',
  color: Colors.white,
  fontSize: '14px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 0px',
    fontSize: '14px',
    maxWidth: '60%',
    maxHeight: '20%',
  },
  [theme.breakpoints.down('md')]: {
    padding: '10px 0px',
    fontSize: '14px',
    maxWidth: '40%',
    maxHeight: '20%',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '10px 0px',
    fontSize: '14px',
    maxWidth: '70%',
    maxHeight: '20%',
  },
}));
