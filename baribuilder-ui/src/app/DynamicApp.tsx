import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import * as ApolloLink from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import * as React from 'react';
import {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Route, Switch} from 'react-router-dom';
import Builder from '../components/builder/Builder';
import config, {isProduction} from '../config/config';
import defaults from '../state/defaults';
import resolvers from '../state/resolvers';
import Dev from './Dev';
import NotFound from './NotFound';


const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      // @ts-ignore Bug
      case 'RegimenProduct': return object.catalogProductId;
      // @ts-ignore Bug
      case 'IngredientType': return object.name;
      default: return defaultDataIdFromObject(object);
    }
  },
  // Prevent unnecessary cache misses https://www.apollographql.com/docs/react/advanced/caching.html#cacheRedirect
  cacheRedirects: {
    Query: {
      CatalogProduct: (_, args, myCache) =>
        myCache.getCacheKey({ __typename: 'CatalogProduct', id: args.id }),
    },
  },
});

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
          {isProduction ? null : <Route exact path='/dev' component={Dev}/>}
          <Route component={NotFound}/>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default DynamicApp;
