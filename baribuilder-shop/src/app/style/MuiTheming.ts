import {createMuiTheme} from '@material-ui/core/styles';
import Sketch from './SketchVariables';

const fontFamily = [
  Sketch.typography.fontFamily,
  'Roboto',
  '"Helvetica Neue"',
  'sans-serif',
].join(',');

const theme = createMuiTheme({
  breakpoints: {
    values: {
      // Don't need mobile (320) since we'll just go with 0
      xs: 0,
      sm: Sketch.breakpoints.tablet,
      md: Sketch.breakpoints.tablet + 1, // not used
      lg: Sketch.breakpoints.desktop,
      xl: Sketch.breakpoints.desktop + 1, // not used
    }
  },
  palette: {
    primary: {
      contrastText: Sketch.color.accent.white,
      dark: Sketch.color.primary.green2,
      main: Sketch.color.primary.green,
    },
    secondary: {
      contrastText: Sketch.color.accent.white,
      light: Sketch.color.secondary.blue2,
      main: Sketch.color.secondary.blue,
    }
  },
  typography: {
    fontFamily,
  },
});

export default theme;
