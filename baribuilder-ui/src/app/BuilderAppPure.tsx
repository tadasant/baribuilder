import {Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import CatalogScreen from '../components/catalog/CatalogScreen';
import Footer from '../components/Footer';
import GoalsScreen from '../components/goals/GoalsScreenContainer';
import {CenteredTextGrid} from '../components/goals/GoalsScreenPure';
import PurchaseScreen from '../components/purchase/PurchaseScreen';
import RequestProductsScreen from '../components/request/RequestProductsScreen';
import ShareScreen from '../components/share/ShareScreen';
import {EmptyRow} from '../components/style/Layout';
import {Header} from '../components/style/Typography';
import TermsAndConditions from '../components/TermsAndConditions';
import {isProduction} from '../config/config';
import Dev from './Dev';
import NotFound from './NotFound';


const disclaimerText = 'The information on this website is not medical advice. Please consult your medical provider ' +
  'before making any changes to your supplementation regimen.';

const BuilderAppPure: SFC<RouteComponentProps> = ({location}) => {
  return (
    <Fragment>
      <Hidden mdDown>
        <Switch key={location.pathname}>
          <Route path="/browse" component={CatalogScreen}/>
          <Route exact path="/goals" component={GoalsScreen}/>
          <Route exact path="/purchase" component={PurchaseScreen}/>
          <Route exact path="/share" component={ShareScreen}/>
          <Route exact path="/request-products" component={RequestProductsScreen}/>
          <Route exact path="/terms-and-conditions" component={TermsAndConditions}/>
          {isProduction ? null : <Route exact path='/dev' component={Dev}/>}
          <Route component={NotFound}/>
        </Switch>
        <Footer disclaimerText={disclaimerText}/>
      </Hidden>
      <Hidden lgUp>
        <Grid container>
          <EmptyRow/>
          <Grid item xs={1}/>
          <CenteredTextGrid item xs={10}>
            <Header dark>
              Sorry, BariBuilder Beta is not yet available on smaller screens.<br/><br/>

              Please visit this page on a desktop with a screen at least 1000 pixels wide.
            </Header>
          </CenteredTextGrid>
          <Grid item xs={1}/>
        </Grid>
      </Hidden>
    </Fragment>
  );
};

export default withRouter(BuilderAppPure);
