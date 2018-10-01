import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import * as ApolloLink from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import * as React from 'react';
import {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Route, Switch} from 'react-router-dom';
import BuilderScreen from '../components/builder/BuilderScreen';
import Footer from '../components/Footer';
import GoalsScreen from '../components/goals/GoalsScreen';
import TermsAndConditions from '../components/TermsAndConditions';
import config, {isProduction} from '../config/config';
import defaults from '../state/defaults';
import resolvers from '../state/resolvers';
import Dev from './Dev';
import NotFound from './NotFound';


const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      // @ts-ignore Bug (obj is not allowed any type's properties)
      case 'ClientCatalogProduct': return `ClientCatalogProduct:${object.catalogProductId}`;
      // @ts-ignore Bug
      case 'IngredientType': return `IngredientType:${object.name}`;
      default:
        return defaultDataIdFromObject(object);
    }
  },
  // Prevent unnecessary cache misses https://www.apollographql.com/docs/react/advanced/caching.html#cacheRedirect
  cacheRedirects: {
    Query: {
      CatalogProduct: (_, args, myCache) =>
        myCache.getCacheKey({__typename: 'CatalogProduct', id: args.id}),
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

const disclaimerText = 'The information on this website is not medical advice. Please consult your medical provider ' +
  'before making any changes to your supplementation regimen.';

class DynamicApp extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/browse" component={BuilderScreen}/>
          <Route exact path="/build" component={GoalsScreen}/>
          <Route exact path="/terms-and-conditions" component={TermsAndConditions}/>
          {isProduction ? null : <Route exact path='/dev' component={Dev}/>}
          <Route component={NotFound}/>
        </Switch>
        <Footer disclaimerText={disclaimerText}/>
      </ApolloProvider>
    );
  }
}

export default DynamicApp;
