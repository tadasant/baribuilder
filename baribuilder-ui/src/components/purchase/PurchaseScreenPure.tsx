import {Button, Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import CurrentRegimenCost from '../builder/building/myRegimen/CurrentRegimenCost';
import RegimenFacts from '../builder/building/myRegimen/RegimenFacts';
import {CenteredTextGrid} from '../goals/GoalsScreenPure';
import {UndecoratedLink} from '../style/CustomMaterial';
import {EmptyRow} from '../style/Layout';
import {Header} from '../style/Typography';
import SelectedProductListings from './children/SelectedProductListings';

const WideUndecoratedLink = styled(UndecoratedLink)`
  && {
    width: 100%;
  }
`;

const RightBorderGrid = styled(Grid)`
  border-right: 1px solid ${Sketch.color.accent.grey};
`;

const PurchaseScreenPure: SFC = () => {
  return (
    <Grid container>
      <EmptyRow/>
      <Grid item lg={1}/>
      <Grid container item lg={4} alignContent='flex-start'>
        <SelectedProductListings/>
      </Grid>
      <RightBorderGrid item lg={1}/>
      <Grid item lg={1}/>
      <Grid item container alignContent='flex-start' lg={4}>
        <CenteredTextGrid item lg={12}>
          <Header dark>My Regimen</Header>
        </CenteredTextGrid>
        <EmptyRow/>
        <Grid item lg={1}/>
        <Grid item lg={10} container alignContent='flex-start'>
          <Grid item lg={12}>
            <CurrentRegimenCost/>
          </Grid>
          <EmptyRow/>
          <Grid item container lg={12}>
            <RegimenFacts/>
          </Grid>
        </Grid>
        <Grid item lg={1}/>
        <EmptyRow/>
        <WideUndecoratedLink to='/goals'>
          <Button variant='raised' color='secondary' fullWidth>
            Edit Goal Ingredients
          </Button>
        </WideUndecoratedLink>
      </Grid>
      <Grid item lg={1}/>
      <EmptyRow/>
    </Grid>
  )
};

export default PurchaseScreenPure;
