import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import * as ApolloLink from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import * as React from 'react';
import {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Route, Switch} from 'react-router-dom';
import Builder from '../components/builder/Builder';
import config from '../config/config';
import defaults from '../state/defaults';
import resolvers from '../state/resolvers';
import NotFound from './NotFound';


const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
});

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: config.graphqlEndpoint,
    })
  ]),
  cache,
});

class DynamicApp extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/builder" component={Builder}/>
          <Route component={NotFound}/>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default DynamicApp;
