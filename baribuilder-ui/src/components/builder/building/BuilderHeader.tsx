import {Grid, Typography} from '@material-ui/core';
import gql from "graphql-tag";
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetProducts} from '../../../typings/gql/GetProducts';

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetProducts>;

// TODO eventually pass filters into this query
const data = graphql<{}, GetProducts>(gql`
    query GetProducts {
        allProducts {
            id
        }
    }
`);

const enhance = compose<DataOutputProps, {}>(
  data,
  pure,
);

const FixedGrid = styled(Grid)`
  && {
    height: 48px;
    border-bottom: 1px solid ${Sketch.color.accent.grey};
  }
`;

const PaddedTypography = styled(Typography)`
  && {
    margin-left: 10px;
  }
`;

// Pure
const ProductSelectionPure: SFC<DataOutputProps> = ({data: {allProducts, loading}}) => {
  const productCount = allProducts && !loading ? allProducts.length : undefined;
  return (
    <FixedGrid container direction='row'>
      <Grid item lg={6} container alignItems='center'>
        <Grid item>
          <PaddedTypography variant='body1'>
            Showing{productCount ? ` ${productCount} ` : ' '}results
          </PaddedTypography>
        </Grid>
      </Grid>
    </FixedGrid>
  )
};

export default enhance(ProductSelectionPure);
