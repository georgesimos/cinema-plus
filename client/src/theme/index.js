import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';

// read more at https://material-ui.com/customization/themes
const theme = createMuiTheme({
    palette,
    typography: {
        useNextVariants: true,
    },
    zIndex: {
        appBar: 1200,
        drawer: 1100
    }
});

export default theme;