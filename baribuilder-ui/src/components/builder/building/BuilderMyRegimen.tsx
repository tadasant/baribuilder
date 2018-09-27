import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';

const PaddedGrid = styled(Grid)`
  padding-top: 16px;
  padding-bottom: 16px;
`;

// Pure
const BuilderMyRegimen: SFC = () => {
  return (
    <PaddedGrid container>
      <Grid item lg={1} />
      <Grid item lg={10} container alignContent='flex-start' direction='column'>
        <Grid item>
          Cost Panel
        </Grid>
        <Grid item>
          Supplement Facts Panel
        </Grid>
      </Grid>
      <Grid item lg={1} />
    </PaddedGrid>
  )
};

export default BuilderMyRegimen;
