import {Grid, Hidden} from '@material-ui/core';
import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import * as ApolloLink from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {withClientState} from 'apollo-link-state';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Route, Switch} from 'react-router-dom';
import BuilderScreen from '../components/builder/BuilderScreen';
import Footer from '../components/Footer';
import GoalsScreen from '../components/goals/GoalsScreen';
import {CenteredTextGrid} from '../components/goals/GoalsScreenPure';
import {EmptyRow} from '../components/style/Layout';
import {Header} from '../components/style/Typography';
import TermsAndConditions from '../components/TermsAndConditions';
import config, {isProduction} from '../config/config';
import defaults from '../state/defaults';
import resolvers from '../state/resolvers';
import Dev from './Dev';
import NotFound from './NotFound';


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
      <Fragment>
        <Hidden mdDown>
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/browse" component={BuilderScreen}/>
              <Route exact path="/goals" component={GoalsScreen}/>
              <Route exact path="/terms-and-conditions" component={TermsAndConditions}/>
              {isProduction ? null : <Route exact path='/dev' component={Dev}/>}
              <Route component={NotFound}/>
            </Switch>
            <Footer disclaimerText={disclaimerText}/>
          </ApolloProvider>
        </Hidden>
        <Hidden lgUp>
          <Grid container>
            <EmptyRow/>
            <Grid item xs={1} />
            <CenteredTextGrid item xs={10}>
              <Header dark>
                Sorry, BariBuilder Beta is not yet available on smaller screens.<br /><br />

                Please visit this page on a desktop with a screen at least 1280 pixels wide.
              </Header>
            </CenteredTextGrid>
            <Grid item xs={1} />
          </Grid>
        </Hidden>
      </Fragment>
    );
  }
}

export default DynamicApp;
