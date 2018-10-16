import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {
  GetClientCatalogProductPrices,
  GetClientCatalogProductPricesVariables
} from '../../../../../typings/gql/GetClientCatalogProductPrices';
import {CenteredTextGrid} from '../../../../goals/GoalsScreenPure';
import {UndecoratedLink} from '../../../../style/CustomMaterial';
import {Body, GreyBody, Header2, Subcaption} from '../../../../style/Typography';

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

const withData = graphql<IProps, GetClientCatalogProductPrices, GetClientCatalogProductPricesVariables, DataOutputProps>(GET_CLIENT_CATALOG_PRODUCT_PRICES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
  }),
});

const CatalogContextPanel: SFC<IProps & DataOutputProps> = ({data: {ClientCatalogProduct}}) => {
  if (!ClientCatalogProduct) {
    return null;
  }
  // TODO replace this with an actual check on goals
  const goalsSet = Boolean(ClientCatalogProduct.projectedRegimenCost);
  const price = goalsSet && ClientCatalogProduct.projectedRegimenCost ? ClientCatalogProduct.projectedRegimenCost.money.toFixed(0) : ClientCatalogProduct.cost.money.toFixed(2);
  const subText = goalsSet ? 'projected total cost' : 'product cost';
  return (
    <Grid container justify='flex-start'>
      <CenteredTextGrid item lg={12}>
        {
          goalsSet
            ? <Body dark>Effect on <b>My Regimen</b></Body>
            : (
              <GreyBody>
                <UndecoratedLink to='/goals'><u>Set your goals</u></UndecoratedLink> to see more information here.
              </GreyBody>
            )
        }
      </CenteredTextGrid>
      <CenteredTextGrid item lg={12}>
        <Header2 dark>${price} / mo.</Header2>
      </CenteredTextGrid>
      <CenteredTextGrid item lg={12}>
        <Subcaption dark>{subText}</Subcaption>
      </CenteredTextGrid>
    </Grid>
  );
};

export default withData(CatalogContextPanel);
