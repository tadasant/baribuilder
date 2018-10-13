import {Grid, Paper} from '@material-ui/core';
import gql from "graphql-tag";
import {keyBy} from 'lodash';
import Pagination from "rc-pagination";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, withState} from 'recompose';
import styled from 'styled-components';
import {CatalogProducts_allCatalogProducts} from '../../../../typings/gql/CatalogProducts';
import {
  GetClientCatalogProductsForProductSelection,
  GetClientCatalogProductsForProductSelection_allClientCatalogProducts,
  GetClientCatalogProductsForProductSelection_searchQuery
} from '../../../../typings/gql/GetClientCatalogProductsForProductSelection';
import {EmptyRow} from '../../../style/Layout';
import {ROOT_CATEGORY, SORTING_STRATEGY} from '../../BuilderScreen';
import ClientCatalogProduct from './ClientCatalogProduct';

interface IProps {
  selectedCategory: string;
  sortingStrategy: SORTING_STRATEGY;
  // Can't be in this component's query because it creates breaking dependency
  allCatalogProducts: CatalogProducts_allCatalogProducts[];
}

// GraphQL HOC props (output)
type DataOutputProps = ChildDataProps<{}, GetClientCatalogProductsForProductSelection>;

export const GET_CLIENT_CATALOG_PRODUCT_IDS_QUERY = gql`
    query GetClientCatalogProductsForProductSelection($category: CATEGORY) {
        allClientCatalogProducts(category: $category) @client {
            catalogProductId
            cost {
                money
                frequency
            }
            projectedRegimenCost {
                money
                frequency
            }
        }
        searchQuery @client {
            value
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

const filterClientCatalogProducts = (
  clientCatalogProducts: GetClientCatalogProductsForProductSelection_allClientCatalogProducts[],
  searchQuery: GetClientCatalogProductsForProductSelection_searchQuery | undefined,
  allCatalogProducts: CatalogProducts_allCatalogProducts[] | undefined
): GetClientCatalogProductsForProductSelection_allClientCatalogProducts[] => {
  if (searchQuery && searchQuery.value) {
    const lowercaseSearchQuery = searchQuery.value.toLowerCase();
    const catalogProductsById = keyBy(allCatalogProducts, product => product.id);
    return clientCatalogProducts.filter(product => (
      catalogProductsById[product.catalogProductId].name.toLowerCase().includes(lowercaseSearchQuery) ||
      catalogProductsById[product.catalogProductId].brand.toLowerCase().includes(lowercaseSearchQuery)
    ));
  }
  return clientCatalogProducts;
};

const sortClientCatalogProducts = (
  clientCatalogProducts: GetClientCatalogProductsForProductSelection_allClientCatalogProducts[],
  sortingStrategy: SORTING_STRATEGY
): void => {
  if (sortingStrategy === SORTING_STRATEGY.COST_ASC) {
    clientCatalogProducts.sort((p1, p2) => {
      const p1Cost = p1.projectedRegimenCost === null ? p1.cost : p1.projectedRegimenCost;
      const p2Cost = p2.projectedRegimenCost === null ? p2.cost : p2.projectedRegimenCost;
      if (p1Cost.frequency !== p2Cost.frequency) {
        console.warn('Cost conversions not supported yet. Error code 010249.');
        return 0;
      }
      return p1Cost.money - p2Cost.money;
    })
  }
};

// Pure
const ProductSelectionPure: SFC<IProps & DataOutputProps & IPropsState> = ({data: {searchQuery, loading, allClientCatalogProducts}, allCatalogProducts, currentPage, setCurrentPage, sortingStrategy}) => {
  if (allClientCatalogProducts !== undefined && !loading) {
    const pageSize = 10;
    allClientCatalogProducts = filterClientCatalogProducts(allClientCatalogProducts, searchQuery, allCatalogProducts);
    sortClientCatalogProducts(allClientCatalogProducts, sortingStrategy);
    const productsToDisplay = allClientCatalogProducts.slice((currentPage - 1) * pageSize, (currentPage * pageSize) - 1);

    const onPaginationChange = (current: number) => setCurrentPage(current);
    return (
      <Grid
        container
        direction='row'
        alignItems='flex-start'>
        {
          productsToDisplay.map(product => (
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
          ))
        }
        <Grid item lg={12} container direction='column' alignContent='flex-end'>
          <Grid item>
            <FloatRightPagination hideOnSinglePage onChange={onPaginationChange} current={currentPage}
                                  defaultPageSize={10} total={allClientCatalogProducts.length}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  return null;
};

export default enhance(ProductSelectionPure);
