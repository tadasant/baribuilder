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
import {EmptyRow} from '../../../../style/Layout';
import {Body, GreyBody, Subcaption} from '../../../../style/Typography';
import HelpIcon from '../../lib/HelpIcon';


const GET_CLIENT_CATALOG_PRODUCT_PRICES_QUERY = gql`
    query GetClientCatalogProductPrices($catalogProductId: ID!) {
        ClientCatalogProduct(catalogProductId: $catalogProductId) @client {
            catalogProductId # ensure cache hit

            cost {
                money
                frequency
            }
            projectedRegimenCost {
                money
                frequency
            }
        }
        goalIngredients @client {
            unfilledIngredientCount
        }
    }
`;

interface IProps {
  catalogProductId: string;
}

type DataOutputProps = ChildDataProps<IProps, GetClientCatalogProductPrices, GetClientCatalogProductPricesVariables>;

const helpText = 'This is what we estimate your TOTAL regimen will cost IF you add this product. In other words, ' +
  'products that give you "more value per dollar" will have LOWER estimated regimen cost.';

const CatalogContextPanel: SFC<IProps & DataOutputProps> = ({data: {ClientCatalogProduct, goalIngredients}}) => {
  if (!ClientCatalogProduct || !goalIngredients || goalIngredients.unfilledIngredientCount === null) {
    return null;
  }
  // TODO replace this with an actual check on goals
  const goalsSet = Boolean(ClientCatalogProduct.projectedRegimenCost);
  const price = goalsSet && ClientCatalogProduct.projectedRegimenCost ? ClientCatalogProduct.projectedRegimenCost.money.toFixed(0) : ClientCatalogProduct.cost.money.toFixed(2);
  const subText = goalsSet ? `estimated regimen cost with all ${goalIngredients.unfilledIngredientCount} of ${goalIngredients.unfilledIngredientCount} ingredients` : 'product cost';
  return (
    <Grid container justify='flex-start'>
      <CenteredTextGrid item lg={12}>
        {
          goalsSet
            ? <Body dark>Effect on <b>My Regimen</b> <HelpIcon tooltipText={helpText} height='16px'/></Body>
            : (
              <GreyBody>
                <UndecoratedLink to='/goals'><u>Set your goals</u></UndecoratedLink> to see better information here.
              </GreyBody>
            )
        }
      </CenteredTextGrid>
      <EmptyRow/>
      <CenteredTextGrid item lg={12}>
        {/* TODO don't hardcode / mo. */}
        <Body dark>${price} / mo.</Body>
      </CenteredTextGrid>
      <CenteredTextGrid item lg={12}>
        <Subcaption dark>{subText}</Subcaption>
      </CenteredTextGrid>
    </Grid>
  );
};

const withData = graphql<IProps, GetClientCatalogProductPrices, GetClientCatalogProductPricesVariables, DataOutputProps>(GET_CLIENT_CATALOG_PRODUCT_PRICES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
  }),
});

export default withData(CatalogContextPanel);
