import {MuiThemeProvider} from '@material-ui/core/styles';
import 'npm-font-open-sans';
import * as React from 'react';
import {Component} from 'react';
import ReactPixel from 'react-facebook-pixel';
import * as ReactGA from 'react-ga';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import devConfig from '../../config/dev.config';
import prodConfig from '../../config/prod.config';
import {IConfig} from '../../config/typing';
import DynamicApp from './DynamicApp';
import NotFound from './NotFound';
import StaticApp from './StaticApp';
import theme from './style/MuiTheming';

const isProduction = window.location.host === 'baribuilder.com';
const config: IConfig = isProduction ? prodConfig : devConfig;

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
          <Switch>
            <Route exact={true} path="/" component={StaticApp}/>
            <Route component={DynamicApp}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
