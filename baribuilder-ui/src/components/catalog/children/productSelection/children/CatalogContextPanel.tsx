import {Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {
  GetClientCatalogProductPrices,
  GetClientCatalogProductPricesVariables
} from '../../../../../typings/gql/GetClientCatalogProductPrices';
import {CenteredTextGrid} from '../../../../goals/GoalsScreenPure';
import {UndecoratedLink} from '../../../../style/CustomMaterial';
import {EmptyRow} from '../../../../style/Layout';
import {Body, BoldBody, GreyBody, Subcaption} from '../../../../style/Typography';
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

const helpText = 'A measure of how well this product fits your remaining goals per dollar spent, from 1 - 10. In other words, ' +
  'a score of 10 means you get perfect "bang for your buck", whereas 0 means the product is way overpriced to suit your goals.';

const CatalogContextPanel: SFC<IProps & DataOutputProps> = ({data: {ClientCatalogProduct, goalIngredients}}) => {
  if (!ClientCatalogProduct || !goalIngredients || goalIngredients.unfilledIngredientCount === null) {
    return null;
  }
  // TODO replace this with an actual check on goals
  const goalsSet = Boolean(ClientCatalogProduct.projectedRegimenCost);
  const price = goalsSet && ClientCatalogProduct.projectedRegimenCost ? ClientCatalogProduct.projectedRegimenCost.money : ClientCatalogProduct.cost.money;
  // TODO refactor projectedRegimenCost so that stays server side i.e. change the value to directly be costEffectivenessRating
  const costEffectivenessRating = goalsSet ? (150 - price) / 15 : null;
  return (
    <Grid container justify='flex-start'>
      <CenteredTextGrid item lg={12}>
        {
          costEffectivenessRating !== null
            ? <Body dark>Cost Effectiveness Rating &nbsp;<HelpIcon tooltipText={helpText} height='16px'/></Body>
            : (
              <GreyBody>
                <UndecoratedLink to='/goals'><u>Set your goals</u></UndecoratedLink> to see better information here.
              </GreyBody>
            )
        }
      </CenteredTextGrid>
      <EmptyRow/>
      {
        costEffectivenessRating !== null
          ? (
            <CenteredTextGrid item lg={12}>
              <BoldBody dark>{costEffectivenessRating.toFixed(1)} / 10</BoldBody>
            </CenteredTextGrid>
          ) : (
            <Fragment>
              <CenteredTextGrid item lg={12}>
                {/* TODO don't hardcode / mo. */}
                <Body dark>${price.toFixed(2)} / mo.</Body>
              </CenteredTextGrid>
              <CenteredTextGrid item lg={12}>
                <Subcaption dark>product cost</Subcaption>
              </CenteredTextGrid>
            </Fragment>
          )
      }
    </Grid>
  );
};

const withData = graphql<IProps, GetClientCatalogProductPrices, GetClientCatalogProductPricesVariables, DataOutputProps>(GET_CLIENT_CATALOG_PRODUCT_PRICES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
  }),
});

export default withData(CatalogContextPanel);
