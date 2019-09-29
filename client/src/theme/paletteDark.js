import { red, blue, yellow, green } from '@material-ui/core/colors';
const white = '#FFF';
const black = '#000';

export default {
  type: 'dark',
  common: {
    black,
    white,
    commonBackground: 'rgb(55, 55, 63)',
    contrastText: white,
    neutral: '#E4E7EB',
    muted: '#9EA0A4'
  },
  default: {
    light: 'rgba(41, 150, 243, .1)',
    main: 'rgba(0, 40, 73, .9)',
    dark: 'rgb(0, 40, 73)',
    logoBg: 'rgb(51, 51, 51)',
    border: 'rgba(0, 40, 73, .1)',
    contrastText: white
  },
  primary: {
    contrastText: white,
    main: '#0767DB',
    light: '#F6F9FD',
    dark: '#0B48A0'
  },
  secondary: {
    contrastText: white,
    main: '#7d58ff',
    light: '',
    dark: '#37248F'
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
    primary: '#12161B',
    secondary: '#66788A',
    disabled: '#A6B1BB'
  },
  background: {
    paper: 'rgb(55, 55, 63)',
    default: 'rgb(51, 51, 60)',
    dark: 'rgb(26, 26, 26)'
  },
  border: '#DFE3E8',
  divider: '#DFE3E8',
  oxfordBlue: 'rgba(5, 41, 73, 1)',
  prussianBlue: 'rgba(19, 49, 92, 1)',
  darkCerulean: 'rgba(19, 64, 116, 1)',
  pewterBlue: 'rgba(141, 169, 196, 1)',
  isabelline: 'rgba(238, 244, 237, 1)'
};
