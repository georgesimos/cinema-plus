// @ts-nocheck
import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';

// read more at https://material-ui.com/customization/themes
const theme = createMuiTheme({
  palette,
  typography: {
    ...typography,
    useNextVariants: true,
    fontSize: 11,
    fontFamily: ['Montserrat', 'sans-serif', 'Helvetica Neue', 'Arial'].join(
      ','
    )
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
