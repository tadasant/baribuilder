import {Grid, Paper} from '@material-ui/core';
import gql from "graphql-tag";
import Pagination from "rc-pagination";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure, withState} from 'recompose';
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
  withState<IProps, number, 'currentPage', 'setCurrentPage'>(
    'currentPage',
    'setCurrentPage',
    1
  ),
  pure,
);

const PaddedDiv = styled.div`
  padding: 8px 8px;
`;

const FloatRightPagination = styled(Pagination)`
  float: right;
`;

interface IPropsState {
  currentPage: number;
  setCurrentPage: (page: number) => number;
}

// Pure
const ProductSelectionPure: SFC<IProps & DataOutputProps & IPropsState> = ({data: {allClientCatalogProducts, loading}, currentPage, setCurrentPage}) => {
  if (allClientCatalogProducts !== undefined && !loading) {
    const pageSize = 10;
    const productsToDisplay = allClientCatalogProducts.slice((currentPage - 1) * pageSize, (currentPage * pageSize) - 1);

    const onPaginationChange = (current: number) => setCurrentPage(current);
    return (
      <Grid container direction='row' alignItems='flex-start'>
        {productsToDisplay.map(product => (
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
        <Grid item lg={12} container direction='column' alignContent='flex-end'>
          <Grid item>
            <FloatRightPagination hideOnSinglePage onChange={onPaginationChange} current={currentPage} defaultPageSize={10} total={allClientCatalogProducts.length}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  return null;
};

export default enhance(ProductSelectionPure);
