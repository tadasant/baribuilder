import {Button, Grid, TextField} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql, Mutation} from 'react-apollo';
import {compose, pure} from 'recompose';
import styled from 'styled-components';
import {CURRENT_REGIMEN_PRODUCTS_QUERY} from '../../../../../state/resolvers/resolver/queries';
import {
  GetClientCatalogProductQuantities,
  GetClientCatalogProductQuantitiesVariables
} from '../../../../../typings/gql/GetClientCatalogProductQuantities';
import {GetCurrentRegimenProducts} from '../../../../../typings/gql/GetCurrentRegimenProducts';
import {EmptyRow} from '../../../../style/Layout';

interface IProps {
  catalogProductId: string;
}

const ADD_PRODUCT_MUTATION = gql`
    mutation AddProduct ($catalogProductId: ID!, $amount: Int!, $frequency: FREQUENCY!, $units: PRODUCT_QUANTITY_UNITS!) {
        AddProductToCurrentRegimen(
            catalogProductId: $catalogProductId,
            amount: $amount,
            frequency: $frequency,
            units: $units
        ) @client {
            catalogProductId
            quantity {
                amount
                frequency
                units
            }
        }
    }
`;

const GET_CLIENT_CATALOG_PRODUCT_QUANTITIES_QUERY = gql`
    query GetClientCatalogProductQuantities($catalogProductId: ID!) {
        ClientCatalogProduct(catalogProductId: $catalogProductId) @client {
            quantity {
                amount
                frequency
                units
            }
        }
    }
`;

type DataOutputProps = ChildDataProps<IProps, GetClientCatalogProductQuantities, GetClientCatalogProductQuantitiesVariables>;

const data = graphql<IProps, GetClientCatalogProductQuantities, GetClientCatalogProductQuantitiesVariables, DataOutputProps>(GET_CLIENT_CATALOG_PRODUCT_QUANTITIES_QUERY, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
  }),
});


const enhance = compose<IProps & DataOutputProps, IProps>(
  data,
  pure,
);

const OuterGrid = styled(Grid)`
  height: 100%;
`;

const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => console.log(event.target.value);

// Pure
const CatalogProductAddPanelPure: SFC<IProps & DataOutputProps> = ({data: {ClientCatalogProduct}, catalogProductId}) => {
  if (!ClientCatalogProduct) {
    return null;
  }
  const {quantity} = ClientCatalogProduct;

  return (
    <OuterGrid item container direction='row' justify='space-evenly'>
      <Grid item lg={2}/>
      <Grid item lg={8}>
        <TextField value={ClientCatalogProduct.quantity.amount || ''} onChange={handleChange} fullWidth label='# servings'/>
      </Grid>
      <Grid item lg={2}/>
      <EmptyRow mobile='0px'/>
      <Grid item lg={4}/>
      <Grid item lg={4}>
        <Mutation
          mutation={ADD_PRODUCT_MUTATION}
          update={(cache, { data: { AddProductToCurrentRegimen } }) => {
            const queryResult = cache.readQuery<GetCurrentRegimenProducts>({ query: CURRENT_REGIMEN_PRODUCTS_QUERY });
            if (queryResult) {
              queryResult.currentRegimen.products.push(AddProductToCurrentRegimen);
              cache.writeQuery({
                query: CURRENT_REGIMEN_PRODUCTS_QUERY,
                data: { currentRegimen: queryResult.currentRegimen }
              });
            }
          }}>
          {(addProduct) => (
            <Button
              variant='raised'
              color='default'
              fullWidth
              onClick={() => addProduct({
                variables: {
                  catalogProductId,
                  amount: quantity.amount,
                  units: quantity.units,
                  frequency: quantity.frequency
                }
              })}>
              Add
            </Button>
          )}
        </Mutation>
      </Grid>
      <Grid item lg={4}/>
    </OuterGrid>
  );
};

export default enhance(CatalogProductAddPanelPure);