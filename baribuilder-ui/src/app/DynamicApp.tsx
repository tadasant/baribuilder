import ApolloClient from 'apollo-boost';
import * as React from 'react'
import {Component} from 'react'
import {ApolloProvider} from 'react-apollo';
import {Route, Switch} from 'react-router-dom';
import Builder from '../components/builder/Builder';
import config from '../config/config';
import NotFound from './NotFound';
import defaults from '../state/defaults';
import resolvers from '../state/resolvers';

const client = new ApolloClient({
  uri: config.graphqlEndpoint,
  clientState: {
    defaults,
    resolvers,
  },
});

class DynamicApp extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Switch>
          <Route exact={true} path="/builder" component={Builder}/>
          <Route component={NotFound}/>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default DynamicApp;
