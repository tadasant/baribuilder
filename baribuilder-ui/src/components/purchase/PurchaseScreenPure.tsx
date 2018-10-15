import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import RegimenFacts from '../builder/building/myRegimen/RegimenFacts';
import {EmptyRow} from '../style/Layout';
import SelectedProductListings from './children/SelectedProductListings';

const PurchaseScreenPure: SFC = () => {
  return (
    <Grid container>
      <EmptyRow/>
      <Grid item lg={1}/>
      <Grid container item lg={5}>
        <SelectedProductListings/>
      </Grid>
      <Grid item lg={1}/>
      <Grid item container lg={4}>
        <RegimenFacts/>
      </Grid>
      <Grid item lg={1}/>
      <EmptyRow/>
    </Grid>
  )
};

export default PurchaseScreenPure;
