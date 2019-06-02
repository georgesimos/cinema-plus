import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography'

// read more at https://material-ui.com/customization/themes
const theme = createMuiTheme({
    palette,
    typography,
    zIndex: {
        appBar: 1200,
        drawer: 1100
    }
});

export default theme;