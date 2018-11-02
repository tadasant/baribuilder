import {Button, Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {EmptyRow} from '../../style/Layout';
import {ButtonFooter, ButtonFooterGrid, HPaddedGrid, NoMarginGrid} from './BuilderMyRegimen';
import CurrentRegimenProducts from './myProducts/CurrentRegimenProducts';

const PaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
  height: 100vh;
  overflow-y: scroll;
`;

const RedButton = styled(Button)`
  && {
    background-color: ${Sketch.color.accent.danger};
    color: white;
    
    &:hover {
      background-color: ${Sketch.color.accent.danger};
      opacity: 0.8;
    }
  }
`;

// Pure
const BuilderMyProducts: SFC = () => {
  return (
    <Fragment>
      <PaddedGrid container alignContent='flex-start'>
        <EmptyRow mobile='1px'/>
        <CurrentRegimenProducts/>
        <EmptyRow mobile='1px'/>
      </PaddedGrid>
      <ButtonFooter>
        <ButtonFooterGrid item lg={12} container direction='column' justify='center'>
          <NoMarginGrid item container>
            <HPaddedGrid item lg={12}>
              <RedButton variant='raised' fullWidth>
                Clear All
              </RedButton>
            </HPaddedGrid>
          </NoMarginGrid>
        </ButtonFooterGrid>
      </ButtonFooter>
    </Fragment>
  )
};

export default BuilderMyProducts;
