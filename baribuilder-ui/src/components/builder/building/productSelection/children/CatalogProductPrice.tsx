import {Grid} from '@material-ui/core';
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
import {CenteredTextGrid} from '../../../../goals/GoalsScreenPure';
import {Header2, Subcaption} from '../../../../style/Typography';

const GET_CLIENT_CATALOG_PRODUCT_PRICES_QUERY = gql`
    query GetClientCatalogProductPrices($catalogProductId: ID!) {
        ClientCatalogProduct(catalogProductId: $catalogProductId) @client {
            catalogProductId # ensure cache hit

            cost {
                money
                frequency
            }
            projectedRegimenCost {
                numRemainingProducts
                money
                frequency
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

const SubcaptionBold = styled(Subcaption)`
  font-weight: bold;
`;

// Pure
const CatalogProductPricePure: SFC<IProps & DataOutputProps> = ({data: {ClientCatalogProduct}}) => {
  if (!ClientCatalogProduct) {
    return null;
  }
  const headerText = ClientCatalogProduct.projectedRegimenCost ? 'If you add this product...' : null;
  const price = ClientCatalogProduct.projectedRegimenCost ? ClientCatalogProduct.projectedRegimenCost.money.toFixed(0) : ClientCatalogProduct.cost.money.toFixed(2);
  const subText = ClientCatalogProduct.projectedRegimenCost ? 'Monthly Regimen Cost (Projected)' : 'Monthly Product Cost';
  const subSubText = ClientCatalogProduct.projectedRegimenCost ? `(with ${ClientCatalogProduct.projectedRegimenCost.numRemainingProducts} more products)` : null;
  return (
    <Fragment>
      <Grid container alignItems='center'>
        {
          headerText
            ? <CenteredTextGrid item lg={12}><Subcaption dark>{headerText}</Subcaption></CenteredTextGrid>
            : null
        }
        <CenteredTextGrid item lg={12}>
          <Header2 dark>${price}</Header2>
        </CenteredTextGrid>
        <CenteredTextGrid item lg={12}>
          <Subcaption dark>{subText}</Subcaption>
        </CenteredTextGrid>
        {
          subSubText
            ? <CenteredTextGrid item lg={12}><SubcaptionBold dark>{subSubText}</SubcaptionBold></CenteredTextGrid>
            : null
        }
      </Grid>
    </Fragment>
  );
};

export default enhance(CatalogProductPricePure);
