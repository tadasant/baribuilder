import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import RegimenFacts from '../builder/building/myRegimen/RegimenFacts';
import {EmptyRow} from '../style/Layout';

const PurchaseScreenPure: SFC = () => {
  return (
    <Grid container>
      <EmptyRow/>
      <Grid item lg={1}/>
      <Grid item lg={5}>
        Selected Products
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
