import {Button, Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {UndecoratedLink} from '../../style/CustomMaterial';
import {EmptyRow} from '../../style/Layout';
import CurrentRegimenCost from './myRegimen/CurrentRegimenCost';
import RegimenFacts from './myRegimen/RegimenFacts';

export const tabFooterHeight = '4em';

const OuterGrid = styled(Grid)`
  && {
    padding-top: 16px;
    padding-bottom: 16px;
    height: calc(100vh - ${tabFooterHeight});
    overflow-y: scroll;
  }
`;

const BottomBorderedGrid = styled(Grid)`
  border-bottom: 1px solid ${Sketch.color.accent.grey};
`;

const Footer = styled.div`
  box-shadow: 0px -2px 4px 0px ${Sketch.color.accent.grey};
  height: ${tabFooterHeight};
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: ${Sketch.color.background.white};
`;

const FooterGrid = styled(Grid)`
  && {
    height: 100%;
  }
`;

const WideLink = styled(UndecoratedLink)`
  && {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

// Pure
const BuilderMyRegimen: SFC = () => {
  return (
    <Fragment>
      <OuterGrid container>
        <Grid item lg={1}/>
        <Grid item lg={10} container alignContent='flex-start'>
          <Grid item lg={12}>
            <CurrentRegimenCost/>
          </Grid>
          <EmptyRow/>
          <BottomBorderedGrid item lg={12}/>
          <EmptyRow/>
          <Grid item container lg={12}>
            <RegimenFacts/>
          </Grid>
        </Grid>
        <Grid item lg={1}/>
        <EmptyRow mobile={`calc(${tabFooterHeight} * 1.5)`}/> {/* Hack for spacing UX */}
      </OuterGrid>
      <Footer>
        <FooterGrid item lg={12} container direction='column' justify='center'>
          <Grid item container>
            <WideLink to='/build'>
              <Button variant='raised' color='secondary' fullWidth>
                Edit Goal Ingredients
              </Button>
            </WideLink>
          </Grid>
        </FooterGrid>
      </Footer>
    </Fragment>
  )
};

export default BuilderMyRegimen;
