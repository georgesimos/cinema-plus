import { red, blue, lightBlue, yellow, green } from '@material-ui/core/colors';
const white = '#FFF';
const black = '#00008B';
const darkPurple = '#17082b';

export default {
  type: 'dark',
  common: {
    black,
    white,
    commonBackground: '#ADD8E6',
    contrastText: white,
    neutral: '#E4E7EB',
    muted: '#ADD8E6'
  },
  default: {
    light: 'rgba(41, 150, 243, .1)',
    main: 'rgba(0, 40, 73, .9)',
    dark: 'rgb(0, 40, 73)',
    logoBg: '#ADD8E6',
    border: 'rgba(0, 40, 73, .1)',
    contrastText: white
  },
  primary: {
    light: lightBlue[300],
    main: lightBlue[500],
    dark: lightBlue[700],
    contrastText: white
  },
  success: {
    light: green[300],
    main: green[500],
    dark: green[700],
    contrastText: white
  },
  info: {
    light: blue[300],
    main: blue[500],
    dark: blue[700],
    contrastText: white
  },
  warning: {
    light: yellow[300],
    main: yellow[500],
    dark: yellow[700],
    contrastText: white
  },
  danger: {
    light: red[300],
    main: red[500],
    dark: red[700],
    contrastText: white
  },
  text: {
    primary: white,
    secondary: white,
    link: white
  },
  background: {
    paper: '#ADD8E6',
    default: darkPurple,
    dark: darkPurple
  },
  border: '#DFE3E8',
  divider: '#DFE3E8',
  oxfordBlue: 'rgba(5, 41, 73, 1)',
  prussianBlue: 'rgba(19, 49, 92, 1)',
  darkCerulean: 'rgba(19, 64, 116, 1)',
  pewterBlue: 'rgba(141, 169, 196, 1)',
  isabelline: 'rgba(238, 244, 237, 1)'
};
