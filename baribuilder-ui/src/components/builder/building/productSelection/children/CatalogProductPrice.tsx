import {Grid, Typography} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {
  GetClientCatalogProductPrices,
  GetClientCatalogProductPricesVariables
} from '../../../../../typings/gql/GetClientCatalogProductPrices';

const GET_CLIENT_CATALOG_PRODUCT_PRICES_QUERY = gql`
    query GetClientCatalogProductPrices($catalogProductId: ID!) {
        ClientCatalogProduct(catalogProductId: $catalogProductId) @client {
            cost {
                money
                frequency
            }
            projectedRegimenCost {
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

type DataOutputProps = ChildDataProps<IProps, GetClientCatalogProductPrices, GetClientCatalogProductPricesVariables>;

const data = graphql<IProps, GetClientCatalogProductPrices, GetClientCatalogProductPricesVariables, DataOutputProps>(GET_CLIENT_CATALOG_PRODUCT_PRICES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
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
const CatalogProductPricePure: SFC<IProps & DataOutputProps> = ({data: {ClientCatalogProduct}}) => {
  if (!ClientCatalogProduct) {
    return null;
  }
  const price = ClientCatalogProduct.projectedRegimenCost ? ClientCatalogProduct.projectedRegimenCost.cost.money.toFixed(0) : ClientCatalogProduct.cost.money.toFixed(2);
  const subText = ClientCatalogProduct.projectedRegimenCost ? 'Monthly Regimen Cost (Projected)' : 'Monthly Product Cost';
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
