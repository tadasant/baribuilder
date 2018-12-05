import {MuiThemeProvider} from '@material-ui/core/styles';
import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as ApolloLink from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import 'npm-font-open-sans';
import * as qs from 'qs';
import * as React from 'react';
import {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Route, RouteComponentProps, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as uuid from 'uuid/v4';
import AboutScreen from '../components/about/AboutScreen';
import TermsAndConditions from '../components/TermsAndConditions';
import config from '../config/config';
import {defaultFields} from '../lib/analytics';
import {getLocalStorage, setLocalStorage} from '../lib/localStorage';
import defaults from '../state/defaults';
import resolvers from '../state/resolvers';
import BuilderApp from './BuilderApp';
import BypassLanding from './landing/templates/BypassLanding';
import SleeveLanding from './landing/templates/SleeveLanding';
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

class App extends Component<RouteComponentProps> {
  componentDidMount() {
    // User ID management for analytics
    let anonymousUserId = getLocalStorage('anonymousUserId');
    if (!anonymousUserId) {
      anonymousUserId = uuid();
      setLocalStorage('anonymousUserId', anonymousUserId);
    }
    analytics.identify(anonymousUserId);
    analytics.page('Loaded App', defaultFields);

    // Only bother w/ exit intent on FB arrivers management
    const queryString = window.location.search;
    const parsedQuery = qs.parse(queryString.slice(1));
    if (parsedQuery.utm_medium === 'ads' && parsedQuery.utm_source === 'facebook') {
      setLocalStorage('enableShowModal', true);
    }
  }

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <ToastContainer autoClose={2000}/>
            <Switch>
              <Route exact path="/" component={StaticApp}/>
              <Route exact path="/terms-and-conditions" component={TermsAndConditions}/>
              <Route exact path="/about" component={AboutScreen}/>
              <Route exact path="/sleeve" component={SleeveLanding}/>
              <Route exact path="/bypass" component={BypassLanding}/>
              <Route component={BuilderApp}/>
            </Switch>
          </ApolloProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
