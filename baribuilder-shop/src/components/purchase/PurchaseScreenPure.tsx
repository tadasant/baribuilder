import {Button, Grid, Hidden} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import CurrentRegimenCost from '../catalog/children/myRegimen/CurrentRegimenCost';
import RegimenFacts from '../catalog/children/myRegimen/RegimenFacts';
import {UndecoratedLink} from '../style/CustomMaterial';
import {CenteredTextGrid, EmptyRow} from '../style/Layout';
import {Header} from '../style/Typography';
import SelectedProductListings from './children/SelectedProductListings';
import SharingURLPanel from './children/SharingURLPanel';

export const WideUndecoratedLink = styled(UndecoratedLink)`
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
      <SharingURLPanel vStickyOffset='0'/>
      <EmptyRow/>
      <Hidden mdDown>
        <Grid item lg={1}/>
        <Grid container item lg={4} alignContent='flex-start'>
          <SelectedProductListings/>
        </Grid>
        <RightBorderGrid item lg={1}/>
      </Hidden>
      <Grid item xs={1}/>
      <Grid item container alignContent='flex-start' lg={4} xs={10}>
        <CenteredTextGrid item xs={12}>
          <Header dark>My Regimen</Header>
        </CenteredTextGrid>
        <EmptyRow/>
        <Grid item xs={1}/>
        <Grid item xs={10} container alignContent='flex-start'>
          <Grid item xs={12}>
            <CurrentRegimenCost/>
          </Grid>
          <EmptyRow/>
          <Grid item container xs={12}>
            <RegimenFacts/>
          </Grid>
        </Grid>
        <Grid item xs={1}/>
        <EmptyRow/>
        <WideUndecoratedLink to='/goals'>
          <Button variant='contained' color='secondary' fullWidth>
            Edit Goal Ingredients
          </Button>
        </WideUndecoratedLink>
      </Grid>
      <Grid item xs={1}/>
      <EmptyRow/>
      <Hidden lgUp>
        <Grid item xs={1}/>
        <Grid container item xs={10} alignContent='flex-start'>
          <SelectedProductListings/>
        </Grid>
        <Grid item xs={1}/>
        <EmptyRow/>
      </Hidden>
    </Grid>
  )
};

export default PurchaseScreenPure;
