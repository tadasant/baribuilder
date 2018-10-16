import {Button, Grid, TextField} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import {BoldBody} from '../../style/Typography';

const HorizontalPaddedGrid = styled(Grid)`
  padding-left: 8px;
  padding-right: 8px;
`;

const SharingURLPanel: SFC = () => {
  return (
    <Fragment>
      <HorizontalPaddedGrid item container lg={10}>
        <Grid container spacing={8} alignItems='flex-end'>
          <Grid item>
            <BoldBody dark>URL to share:</BoldBody>
          </Grid>
          <Grid item lg>
            <TextField fullWidth/>
          </Grid>
        </Grid>
      </HorizontalPaddedGrid>
      <HorizontalPaddedGrid item lg={2}>
        <Button color='primary' variant='raised' fullWidth>Copy</Button>
      </HorizontalPaddedGrid>
    </Fragment>
  )
};

export default SharingURLPanel;
