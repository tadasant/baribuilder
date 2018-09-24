import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';

interface IProps {
  value: number;
  onChange: (value: number) => void;
  className?: string; // styled-components
}

const LeftGrid = styled(Grid)`
  && {
    background-color: grey;
    border-radius: 1em 0 0 1em;
    height: 100%;
    border-right: 1px solid grey;
  }
`;

// Pure
const PlusMinus: SFC<IProps> = ({value, onChange, className}) => {
  return (
    <Grid container className={className}>
      <LeftGrid item xs={4}>
        minus button
      </LeftGrid>
      <Grid item xs={4}>
        edit box
      </Grid>
      <Grid item xs={4}>
        plsu button
      </Grid>
    </Grid>
  );
};

export default PlusMinus;
