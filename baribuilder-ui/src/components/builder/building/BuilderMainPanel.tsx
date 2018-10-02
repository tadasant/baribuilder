import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
// TODO move this to styled components
import '../../../rc-pagination.css';
import {EmptyRow} from '../../style/Layout';
import {SORTING_STRATEGY} from '../BuilderScreen';
import ClientCatalogProductSelection from './productSelection/ClientCatalogProductSelection';

interface IProps {
  selectedCategory: string;
  sortingStrategy: SORTING_STRATEGY;
}

const PaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
`;

// Pure
const BuilderMainPanel: SFC<IProps> = ({selectedCategory, sortingStrategy}) => {
  return (
    <PaddedGrid container alignContent='flex-start'>
      <EmptyRow mobile='1px'/>
      <Grid item container direction='row'>
        <Grid item lg={12}>
          <ClientCatalogProductSelection selectedCategory={selectedCategory} sortingStrategy={sortingStrategy}/>
        </Grid>
      </Grid>
      <EmptyRow mobile='1px'/>
    </PaddedGrid>
  )
};

export default BuilderMainPanel;
