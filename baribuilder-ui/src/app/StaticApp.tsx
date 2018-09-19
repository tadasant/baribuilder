import * as React from 'react';
import {Component, Fragment} from 'react';
import {match, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import Landing from '../components/landing/Landing.react';
import MailchimpForm from '../components/landing/MailchimpForm.react';

interface IProps {
  match: match
}

class StaticApp extends Component<IProps> {
  render() {
    return (
      <Fragment>
        <Header/>
        <Switch>
          <Route exact={true} path={this.props.match.url} component={Landing}/>
          <Route path={this.props.match.url + 'signup'} component={MailchimpForm}/>
        </Switch>
      </Fragment>
    );
  }
}

export default StaticApp;
