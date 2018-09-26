import {Grid, Paper} from '@material-ui/core';
import gql from "graphql-tag";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {GetClientCatalogProductsForProductSelection} from '../../../../typings/gql/GetClientCatalogProductsForProductSelection';
import {EmptyRow} from '../../../style/Layout';
// import Product from './CatalogProduct';

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetClientCatalogProductsForProductSelection>;

const data = graphql<{}, GetClientCatalogProductsForProductSelection>(gql`
    query GetClientCatalogProductsForProductSelection {
        allClientCatalogProducts @client {
            catalogProductId
        }
    }
`);

const enhance = compose<DataOutputProps, {}>(
  data,
  pure,
);

const PaddedDiv = styled.div`
  padding: 8px 8px;
`;

// Pure
const ProductSelectionPure: SFC<DataOutputProps> = ({data: {allClientCatalogProducts, loading}}) => {
  if (allClientCatalogProducts !== undefined && !loading) {
    return (
      <Grid container direction='row' alignItems='flex-start'>
        {allClientCatalogProducts.map(product => (
          <Fragment key={product.catalogProductId}>
            <Grid item lg={12}>
              <Paper>
                <PaddedDiv>
                  {/*<Product id={product.id}/>*/}
                </PaddedDiv>
              </Paper>
            </Grid>
            <EmptyRow mobile='0px'/>
          </Fragment>
        ))}
      </Grid>
    );
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  return null;
};

export default enhance(ProductSelectionPure);
