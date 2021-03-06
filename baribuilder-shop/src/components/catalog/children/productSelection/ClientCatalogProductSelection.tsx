import {Grid} from '@material-ui/core';
import Pagination from "rc-pagination";
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {compose, withState} from 'recompose';
import styled from 'styled-components';
import Sketch from '../../../../app/style/SketchVariables';
import {GetCatalogProducts_allClientCatalogProducts} from '../../../../typings/gql/GetCatalogProducts';
import {UndecoratedLink} from '../../../style/CustomMaterial';
import {EmptyRow} from '../../../style/Layout';
import {GreyHeader2} from '../../../style/Typography';
import {SORTING_STRATEGY} from '../../CatalogScreen';
import ClientCatalogProduct from './ClientCatalogProduct';

interface IProps {
  selectedCategory: string;
  sortingStrategy: SORTING_STRATEGY;
  // Can't be in this component's query because it creates breaking dependency
  filteredClientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[];
  onAddToRegimen?: () => void;
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
  clientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[],
  sortingStrategy: SORTING_STRATEGY
): void => {
  if (sortingStrategy === SORTING_STRATEGY.COST_ASC) {
    clientCatalogProducts.sort((p1, p2) => {
      if (p1.cost.frequency !== p2.cost.frequency) {
        console.warn('Cost conversions not supported yet. Error code 010249.');
        return 0;
      }
      return p1.cost.money - p2.cost.money;
    })
  } else if (sortingStrategy === SORTING_STRATEGY.COST_EFFECTIVENESS_DESC) {
    clientCatalogProducts.sort((p1, p2) => {
      return (p2.costEffectivenessRating || 0) - (p1.costEffectivenessRating || 0);
    })
  } else if (sortingStrategy === SORTING_STRATEGY.FILL_DESC) {
    clientCatalogProducts.sort((p1, p2) => {
      return (p1.defaultQuantity.remainingUnfilledIngredientCount || 0) - (p2.defaultQuantity.remainingUnfilledIngredientCount || 0)
    })
  }
};

const GridWithBottomBorder = styled(Grid)`
  border-bottom: 1px solid ${Sketch.color.accent.grey};
`;

const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

// Pure
const ProductSelectionPure: SFC<IProps & IPropsState> = ({filteredClientCatalogProducts, currentPage, setCurrentPage, sortingStrategy, onAddToRegimen}) => {
  if (filteredClientCatalogProducts) {
    const pageSize = 10;
    sortClientCatalogProducts(filteredClientCatalogProducts, sortingStrategy);
    const productsToDisplay = filteredClientCatalogProducts.slice((currentPage - 1) * pageSize, (currentPage * pageSize) - 1);

    const onPaginationChange = (current: number) => setCurrentPage(current);
    return (
      <CenteredTextGrid
        container
        direction='row'
        alignItems='flex-start'>
        {
          productsToDisplay.length === 0
            ? (
              <GreyHeader2>No results found. Would you like to <UndecoratedLink to='/request-products'><u>request a
                product?</u></UndecoratedLink></GreyHeader2>
            )
            : null
        }
        {
          productsToDisplay.map(product => (
            <Fragment key={product.catalogProductId}>
              <GridWithBottomBorder item xs={12}>
                <PaddedDiv>
                  <ClientCatalogProduct id={product.catalogProductId} onAddToRegimen={onAddToRegimen}/>
                </PaddedDiv>
              </GridWithBottomBorder>
              <EmptyRow mobile='0px'/>
            </Fragment>
          ))
        }
        {
          productsToDisplay.length !== 0
            ? (
              <Grid item xs={12}>
                <GreyHeader2>Can't find what you're looking for?</GreyHeader2>
                <br />
                <GreyHeader2>
                  <UndecoratedLink to='/request-products'><u>Request a product.</u></UndecoratedLink>
                </GreyHeader2>
              </Grid>
            )
            : null
        }
        <Grid item xs={12} container direction='column' alignContent='flex-end'>
          <Grid item>
            <FloatRightPagination hideOnSinglePage onChange={onPaginationChange} current={currentPage}
                                  defaultPageSize={10} total={filteredClientCatalogProducts.length}/>
          </Grid>
        </Grid>
      </CenteredTextGrid>
    );
  }
  // TODO add data.error branch (need a way to force not undefined in that case)
  return null;
};

export default enhance(ProductSelectionPure);
