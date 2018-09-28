import {Grid, Paper} from '@material-ui/core';
import gql from "graphql-tag";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {GetClientCatalogProductsForProductSelection} from '../../../../typings/gql/GetClientCatalogProductsForProductSelection';
import {EmptyRow} from '../../../style/Layout';
import {ROOT_CATEGORY} from '../../BuilderScreen';
import ClientCatalogProduct from './ClientCatalogProduct';

interface IProps {
  selectedCategory: string;
}

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetClientCatalogProductsForProductSelection>;

export const GET_CLIENT_CATALOG_PRODUCT_IDS_QUERY = gql`
    query GetClientCatalogProductsForProductSelection($category: FREQUENCY) {
        allClientCatalogProducts(category: $category) @client {
            catalogProductId
        }
    }
`;

const withData = graphql<IProps, GetClientCatalogProductsForProductSelection>(GET_CLIENT_CATALOG_PRODUCT_IDS_QUERY, {
  options: ({selectedCategory}) => {
    const category = selectedCategory === ROOT_CATEGORY ? undefined : selectedCategory;
    return {
      variables: {category},
    };
  }
});

const enhance = compose<DataOutputProps, IProps>(
  withData,
  pure,
);

const PaddedDiv = styled.div`
  padding: 8px 8px;
`;

// Pure
const ProductSelectionPure: SFC<DataOutputProps> = ({data: {allClientCatalogProducts, loading}}) => {
  if (allClientCatalogProducts !== undefined && !loading) {
    // TODO delete this in favor of e.g. paging or infinite scroll
    allClientCatalogProducts.splice(25, allClientCatalogProducts.length - 25);
    return (
      <Grid container direction='row' alignItems='flex-start'>
        {allClientCatalogProducts.map(product => (
          <Fragment key={product.catalogProductId}>
            <Grid item lg={12}>
              <Paper>
                <PaddedDiv>
                  <ClientCatalogProduct id={product.catalogProductId}/>
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
