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
import {Caption, Header} from '../style/Typography';
import SelectedProductListings from './children/SelectedProductListings';
import SharingURLPanel from './children/SharingURLPanel';

const WideUndecoratedLink = styled(UndecoratedLink)`
  && {
    width: 100%;
  }
`;

const RightBorderGrid = styled(Grid)`
  border-right: 1px solid ${Sketch.color.accent.grey};
`;

const PaperGrid = styled(Grid)`
  box-shadow: 2px 0px 4px 0px ${Sketch.color.accent.darkgrey};
  height: 64px;
  padding: 16px 0px 16px;
`;

const PurchaseScreenPure: SFC = () => {
  return (
    <Grid container>
      <PaperGrid container justify='flex-end'>
        <SharingURLPanel/>
      </PaperGrid>
      <EmptyRow/>
      <CenteredTextGrid item lg={12}>
        <Caption dark>
          Checkout directly on BariBuilder is not yet available. Make purchases on Amazon by clicking the name of
          each product next to its image.
        </Caption>
      </CenteredTextGrid>
      <EmptyRow/>
      <EmptyRow/>
      <Grid item lg={1}/>
      <Grid container item lg={4} alignContent='flex-start'>
        <SelectedProductListings/>
        <EmptyRow/>
        <WideUndecoratedLink to='/browse/all_products'>
          <Button variant='raised' color='secondary' fullWidth>
            Edit Selections
          </Button>
        </WideUndecoratedLink>
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
