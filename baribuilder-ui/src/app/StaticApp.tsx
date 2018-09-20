import * as React from 'react';
import {Component, Fragment} from 'react';
import {match, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import Landing from '../components/landing/Landing.react';

interface IProps {
  match: match
}

class StaticApp extends Component<IProps> {
  render() {
    return (
      <Fragment>
        <Header/>
        <Switch>
          <Route exact path={this.props.match.url} component={Landing}/>
        </Switch>
      </Fragment>
    );
  }
}

export default StaticApp;
