import * as React from 'react';
import {Component} from 'react';
import {match, Route, Switch} from 'react-router-dom';
import Landing from '../components/landing/Landing.react';
import MailchimpForm from '../components/landing/MailchimpForm.react';

interface IProps {
  match: match
}

class StaticApp extends Component<IProps> {
  render() {
    return (
      <Switch>
        <Route exact={true} path={this.props.match.url} component={Landing}/>
        <Route path={this.props.match.url + 'signup'} component={MailchimpForm}/>
      </Switch>
    );
  }
}

export default StaticApp;
