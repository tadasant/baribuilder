import * as React from 'react'
import {Component} from 'react'
// import ApolloClient from 'apollo-boost';
// import {ApolloProvider} from 'react-apollo';
import {Route, Switch} from 'react-router-dom';
import Builder from '../components/builder/Builder';
import NotFound from './NotFound';

// const client = new ApolloClient({
//   uri: "https://api-useast.graphcms.com/v1/cjko3wfon06d601cospqasvh8/master"
// });

class DynamicApp extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/builder" component={Builder}/>
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default DynamicApp;
