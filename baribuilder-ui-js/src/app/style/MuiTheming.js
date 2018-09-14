import { createMuiTheme } from '@material-ui/core/styles';
import Sketch from './SketchVariables';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Sketch.color.primary.green,
      dark: Sketch.color.primary.green2,
      contrastText: Sketch.color.accent.white,
    },
    secondary: {
      light: Sketch.color.secondary.blue2,
      main: Sketch.color.secondary.blue,
      contrastText: Sketch.color.accent.white,
    }
  },
  typography: {
    fontFamily: [
      Sketch.typography.fontFamily,
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
  },
  breakpoints: {
    values: {
      // Don't need mobile (320) since we'll just go with 0
      xs: 0,
      sm: Sketch.breakpoints.tablet,
      lg: Sketch.breakpoints.desktop,
    }
  }
});

export default theme;
