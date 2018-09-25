import {Grid, Paper} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import {EmptyRow} from '../../style/Layout';
import CurrentRegimenProducts from './myProducts/CurrentRegimenProducts';

const PaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
`;

// Pure
const BuilderMyProducts: SFC = () => {
  return (
    <PaddedGrid container alignContent='flex-start'>
      <EmptyRow mobile='1px'/>
      <Paper>
        <CurrentRegimenProducts />
      </Paper>
      <EmptyRow mobile='1px'/>
    </PaddedGrid>
  )
};

export default BuilderMyProducts;
