import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import {EmptyRow} from '../style/Layout';

const GoalsScreen: SFC = () => {
  return (
    <Grid container alignContent='flex-start'>
      <EmptyRow/>
      Title<br />
      Ingredient Range List<br />
      Add Ingredient<br />
      Footer bar<br />
      <EmptyRow/>
    </Grid>
  )
};

export default GoalsScreen;
