import {Grid, Typography} from '@material-ui/core';
import gql from "graphql-tag";
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {GetProductsForBuilderHeader} from '../../../typings/gql/GetProductsForBuilderHeader';

export const builderHeaderHeight = '48px';

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetProductsForBuilderHeader>;

// TODO eventually pass filters & selected category into this query
const data = graphql<{}, GetProductsForBuilderHeader>(gql`
    query GetProductsForBuilderHeader {
        allCatalogProducts {
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
    height: ${builderHeaderHeight};
    border-bottom: 1px solid ${Sketch.color.accent.grey};
  }
`;

const PaddedTypography = styled(Typography)`
  && {
    margin-left: 10px;
  }
`;

// Pure
const ProductSelectionPure: SFC<DataOutputProps> = ({data: {allCatalogProducts, loading}}) => {
  const productCount = allCatalogProducts && !loading ? allCatalogProducts.length : undefined;
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
