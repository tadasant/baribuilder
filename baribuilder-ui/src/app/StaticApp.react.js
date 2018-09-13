import React, {Component} from 'react';
import Landing from '../components/landing/Landing.react';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import MailchimpForm from '../components/landing/MailchimpForm.react';

class StaticApp extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={this.props.match.url} component={Landing}/>
        <Route path={this.props.match.url + 'signup'} component={MailchimpForm}/>
      </Switch>
    );
  }
}

StaticApp.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default StaticApp;
