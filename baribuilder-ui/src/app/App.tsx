import {MuiThemeProvider} from '@material-ui/core/styles';
import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as ApolloLink from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import 'npm-font-open-sans';
import * as React from 'react';
import {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Navbar from '../components/navbar/Navbar';
import config from '../config/config';
import defaults from '../state/defaults';
import resolvers from '../state/resolvers';
import BuilderApp from './BuilderApp';
import NotFound from './NotFound';
import StaticApp from './StaticApp';
import theme from './style/MuiTheming';

// Apollo initialization
const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'ClientCatalogProduct':
        // @ts-ignore Bug (obj is not allowed any type's properties)
        return `ClientCatalogProduct:${object.catalogProductId}`;
      case 'IngredientType':
        // @ts-ignore Bug
        return `IngredientType:${object.name}`;
      default:
        return defaultDataIdFromObject(object);
    }
  },
  // Prevent unnecessary cache misses https://www.apollographql.com/docs/react/advanced/caching.html#cacheRedirect
  cacheRedirects: {
    Query: {
      CatalogProduct: (_, args, myCache) =>
        myCache.getCacheKey({__typename: 'CatalogProduct', id: args.id}),
      IngredientType: (_, args, myCache) =>
        myCache.getCacheKey({__typename: 'IngredientType', id: args.name}),
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

class App extends Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <ToastContainer autoClose={2000}/>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={StaticApp}/>
              <Route component={BuilderApp}/>
              <Route component={NotFound}/>
            </Switch>
          </ApolloProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
