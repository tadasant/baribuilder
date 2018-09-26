import {MuiThemeProvider} from '@material-ui/core/styles';
import 'npm-font-open-sans';
import * as React from 'react';
import {Component, Fragment} from 'react';
import ReactPixel from 'react-facebook-pixel';
import * as ReactGA from 'react-ga';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import config from '../config/config';
import DynamicApp from './DynamicApp';
import NotFound from './NotFound';
import StaticApp from './StaticApp';
import theme from './style/MuiTheming';

// Initialize FB Pixel
const advancedMatching = {};
ReactPixel.init(config.fbPixel.key, advancedMatching, config.fbPixel.settings);
ReactPixel.pageView();

// Initialize Google Analytics
ReactGA.initialize(config.ga.key as string, config.ga.settings);
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Fragment>
            <Header/>
            <Switch>
              <Route exact path="/" component={StaticApp}/>
              <Route component={DynamicApp}/>
              <Route component={NotFound}/>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
