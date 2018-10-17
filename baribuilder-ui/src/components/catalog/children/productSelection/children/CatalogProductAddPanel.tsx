import {Grid, TextField} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {ChangeEvent, Fragment, SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, withProps, withState} from 'recompose';
import styled from 'styled-components';
import {
  GetClientCatalogProductQuantities,
  GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity,
  GetClientCatalogProductQuantitiesVariables
} from '../../../../../typings/gql/GetClientCatalogProductQuantities';
import {FREQUENCY} from '../../../../../typings/gql/globalTypes';
import {CenteredTextGrid} from '../../../../goals/GoalsScreenPure';
import {EmptyRow} from '../../../../style/Layout';
import {Body, Subcaption} from '../../../../style/Typography';
import CatalogProductAddButton from './CatalogProductAddButton';

interface IProps {
  catalogProductId: string;
}

const GET_CLIENT_CATALOG_PRODUCT_QUANTITIES_QUERY = gql`
    query GetClientCatalogProductQuantities($catalogProductId: ID!) {
        ClientCatalogProduct(catalogProductId: $catalogProductId) @client {
            catalogProductId # ensure cache hit

            defaultQuantity {
                amount
                frequency
                units
                remainingUnfilledIngredientCount
            }
        }
        goalIngredients @client {
            ingredientRanges {
                ingredientTypeName
            }
            unfilledIngredientCount
        }
    }
`;

type DataOutputProps = ChildDataProps<IProps, GetClientCatalogProductQuantities, GetClientCatalogProductQuantitiesVariables>;

const withData = graphql<IProps, GetClientCatalogProductQuantities, GetClientCatalogProductQuantitiesVariables, DataOutputProps>(GET_CLIENT_CATALOG_PRODUCT_QUANTITIES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
  }),
});


const enhance = compose<IProps & DataOutputProps & IPropsState, IProps>(
  withData,
  // Used to become fully controlled: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html?no-cache=1#recommendation-fully-uncontrolled-component-with-a-key
  withProps<{ key: string }, DataOutputProps>(
    ({data: {ClientCatalogProduct}}) => (
      {
        key: ClientCatalogProduct
          ? `${ClientCatalogProduct.defaultQuantity.frequency}_${ClientCatalogProduct.defaultQuantity.amount}_${ClientCatalogProduct.defaultQuantity.units}`
          : 'no-data',
      }
    )
  ),
  withState<DataOutputProps, number, 'quantityAmount', 'setQuantityAmount'>(
    'quantityAmount',
    'setQuantityAmount',
    props => props.data.ClientCatalogProduct ? props.data.ClientCatalogProduct.defaultQuantity.amount : 0
  ),
  withState<DataOutputProps, FREQUENCY, 'quantityFrequency', 'setQuantityFrequency'>(
    'quantityFrequency',
    'setQuantityFrequency',
    props => props.data.ClientCatalogProduct ? props.data.ClientCatalogProduct.defaultQuantity.frequency : FREQUENCY.DAILY,
  ),
);

interface IPropsState {
  quantityAmount: number;
  setQuantityAmount: (quantity: number) => number;
  quantityFrequency: FREQUENCY;
  setQuantityFrequency: (quantityFrequency: FREQUENCY) => FREQUENCY;
}

const OuterGrid = styled(Grid)`
  height: 100%;
`;

// Pure
const CatalogProductAddPanelPure: SFC<IProps & DataOutputProps & IPropsState> = ({data: {ClientCatalogProduct, goalIngredients}, catalogProductId, quantityAmount, setQuantityAmount, quantityFrequency}) => {
  // TODO manage frequency, maybe units
  if (!ClientCatalogProduct || !goalIngredients || !goalIngredients.unfilledIngredientCount || !ClientCatalogProduct.defaultQuantity.remainingUnfilledIngredientCount) {
    return null;
  }
  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => setQuantityAmount(event.target.value ? parseInt(event.target.value, 10) : 0);
  const quantity: GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity = {
    __typename: 'CatalogProductQuantity',
    frequency: quantityFrequency,
    units: ClientCatalogProduct.defaultQuantity.units,
    amount: quantityAmount,
    remainingUnfilledIngredientCount: null,
  };

  const fullfilledIngredientCount = goalIngredients.unfilledIngredientCount - ClientCatalogProduct.defaultQuantity.remainingUnfilledIngredientCount;

  return (
    <OuterGrid item container direction='row' justify='space-evenly'>
      <Grid item lg={4}/>
      <Grid item lg={4}>
        <TextField type='number' value={quantityAmount || ''} onChange={handleChangeQuantity} fullWidth/>
        <CenteredTextGrid item lg={12}>
          <Subcaption dark>daily servings</Subcaption>
        </CenteredTextGrid>
      </Grid>
      <Grid item lg={4}/>
      <EmptyRow mobile='0px'/>
      {
        fullfilledIngredientCount !== null
          ? (
            <Fragment>
              <CenteredTextGrid item lg={12}>
                <Body dark>fills {fullfilledIngredientCount} of {goalIngredients.unfilledIngredientCount}</Body>
              </CenteredTextGrid>
              <CenteredTextGrid item lg={12}>
                <Subcaption dark>remaining regimen ingredients</Subcaption>
              </CenteredTextGrid>
              <EmptyRow mobile='0px'/>
            </Fragment>
          )
          : null
      }
      <Grid item lg={2}/>
      <Grid item lg={8}>
        <CatalogProductAddButton catalogProductId={catalogProductId} quantity={quantity}/>
      </Grid>
      <Grid item lg={2}/>
    </OuterGrid>
  );
};

export default enhance(CatalogProductAddPanelPure);
