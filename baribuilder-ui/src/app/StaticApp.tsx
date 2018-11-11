import * as React from 'react';
import {Component, Fragment} from 'react';
import {match, Route, Switch} from 'react-router-dom';
import Landing from '../components/landing/Landing';
import LandingNavbar from '../components/landing/navbar/LandingNavbar';

interface IProps {
  match: match
}

class StaticApp extends Component<IProps> {
  render() {
    return (
      <Fragment>
        <LandingNavbar />
        <Switch>
          <Route exact path={this.props.match.url} component={Landing}/>
        </Switch>
      </Fragment>
    );
  }
}

export default StaticApp;
