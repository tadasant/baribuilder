import {Grid, Paper} from '@material-ui/core';
import Pagination from "rc-pagination";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {compose, withState} from 'recompose';
import styled from 'styled-components';
import {GetClientCatalogProducts_allClientCatalogProducts} from '../../../../typings/gql/GetClientCatalogProducts';
import {EmptyRow} from '../../../style/Layout';
import {SORTING_STRATEGY} from '../../BuilderScreen';
import ClientCatalogProduct from './ClientCatalogProduct';

interface IProps {
  selectedCategory: string;
  sortingStrategy: SORTING_STRATEGY;
  // Can't be in this component's query because it creates breaking dependency
  filteredClientCatalogProducts: GetClientCatalogProducts_allClientCatalogProducts[];
}

const enhance = compose<IPropsState, IProps>(
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

const sortClientCatalogProducts = (
  clientCatalogProducts: GetClientCatalogProducts_allClientCatalogProducts[],
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
const ProductSelectionPure: SFC<IProps & IPropsState> = ({filteredClientCatalogProducts, currentPage, setCurrentPage, sortingStrategy}) => {
  if (filteredClientCatalogProducts) {
    const pageSize = 10;
    sortClientCatalogProducts(filteredClientCatalogProducts, sortingStrategy);
    const productsToDisplay = filteredClientCatalogProducts.slice((currentPage - 1) * pageSize, (currentPage * pageSize) - 1);

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
                                  defaultPageSize={10} total={filteredClientCatalogProducts.length}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  return null;
};

export default enhance(ProductSelectionPure);
