import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import StaticApp from './StaticApp.react';
import NotFound from './NotFound.react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './style/MuiTheming';
import 'npm-font-open-sans';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

const isProduction = window.location.host === 'baribuilder.com';

// Prod pixel or dev pixel
const fbPixel = isProduction ? '521388551638106' : '1096420780524071';
const reactGaSettings = {};
const reactFbPixelSettings = {
  autoConfig: true,
};

if (isProduction) {
  reactGaSettings.gaOptions = {};
  reactFbPixelSettings.debug = false;
} else {
  reactGaSettings.debug = true;
  reactFbPixelSettings.debug = true;
  reactGaSettings.gaOptions = {};
}


// Initialize FB Pixel
const advancedMatching = {};
ReactPixel.init(fbPixel, advancedMatching, reactFbPixelSettings);
ReactPixel.pageView();

// Initialize Google Analytics
ReactGA.initialize('UA-104887163-2', reactGaSettings);
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={StaticApp}/>
            {/*<Route component={DynamicApp}/>*/}
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
