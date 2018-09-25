import {Grid, Typography} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {
  GetCatalogProductPrices,
  GetCatalogProductPricesVariables
} from '../../../../../typings/gql/GetCatalogProductPrices';

const GET_CATALOG_PRODUCT_PRICES_QUERY = gql`
    query GetCatalogProductPrices($id: ID) {
        CatalogProduct(id: $id) {
            cost @client {
                money
                frequency
            }
            projectedRegimenCost @client {
                numRemainingProducts
                cost {
                    money
                    frequency
                }
            }
        }
    }
`;

interface IProps {
  catalogProductId: string;
}

type DataOutputProps = ChildDataProps<IProps, GetCatalogProductPrices, GetCatalogProductPricesVariables>;

const data = graphql<IProps, GetCatalogProductPrices, GetCatalogProductPricesVariables, DataOutputProps>(GET_CATALOG_PRODUCT_PRICES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {id: catalogProductId},
  }),
});

const enhance = compose<IProps & DataOutputProps, IProps>(
  data,
  pure,
);

const PriceText = styled(Typography)`
  && { 
    font-weight: 600;
    font-size: 36px;
    text-align: center;
  }  
`;

const PriceDescriptionText = styled(Typography)`
  text-align: center;
`;

// Pure
const CatalogProductPricePure: SFC<IProps & DataOutputProps> = ({data: {CatalogProduct}, catalogProductId}) => {
  if (!CatalogProduct) {
    return null;
  }
  const price = CatalogProduct.projectedRegimenCost ? CatalogProduct.projectedRegimenCost.cost.money.toFixed(0) : CatalogProduct.cost.money.toFixed(2);
  const subText = CatalogProduct.projectedRegimenCost ? 'Monthly Regimen Cost (Projected)' : 'Monthly Product Cost';
  return (
    <Fragment>
      <Grid container alignItems='center'>
        <Grid item lg={12}>
          <PriceText>${price}</PriceText>
          <PriceDescriptionText variant='caption'>{subText}</PriceDescriptionText>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default enhance(CatalogProductPricePure);
