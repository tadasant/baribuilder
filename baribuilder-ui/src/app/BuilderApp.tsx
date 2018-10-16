import {Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import BuilderScreen from '../components/builder/BuilderScreen';
import Footer from '../components/Footer';
import GoalsScreen from '../components/goals/GoalsScreen';
import {CenteredTextGrid} from '../components/goals/GoalsScreenPure';
import PurchaseScreen from '../components/purchase/PurchaseScreen';
import ShareScreen from '../components/share/ShareScreen';
import {EmptyRow} from '../components/style/Layout';
import {Header} from '../components/style/Typography';
import TermsAndConditions from '../components/TermsAndConditions';
import {isProduction} from '../config/config';
import Dev from './Dev';
import NotFound from './NotFound';


const disclaimerText = 'The information on this website is not medical advice. Please consult your medical provider ' +
  'before making any changes to your supplementation regimen.';

class BuilderApp extends Component {
  render() {
    return (
      <Fragment>
        <Hidden mdDown>
          <Switch>
            <Route path="/browse" component={BuilderScreen}/>
            <Route exact path="/goals" component={GoalsScreen}/>
            <Route exact path="/purchase" component={PurchaseScreen}/>
            <Route exact path="/share" component={ShareScreen}/>
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

                Please visit this page on a desktop with a screen at least 1280 pixels wide.
              </Header>
            </CenteredTextGrid>
            <Grid item xs={1}/>
          </Grid>
        </Hidden>
      </Fragment>
    );
  }
}

export default BuilderApp;
