import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import {EmptyRow} from '../../style/Layout';
import ClientCatalogProductSelection from './productSelection/ClientCatalogProductSelection';

interface IProps {
  selectedCategory: string;
}

const PaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
`;

// Pure
const BuilderMainPanel: SFC<IProps> = ({selectedCategory}) => {
  return (
    <PaddedGrid container alignContent='flex-start'>
      <EmptyRow mobile='1px'/>
      <Grid item container direction='row'>
        <Grid item lg={12}>
          <ClientCatalogProductSelection selectedCategory={selectedCategory}/>
        </Grid>
      </Grid>
      <EmptyRow mobile='1px'/>
    </PaddedGrid>
  )
};

export default BuilderMainPanel;
