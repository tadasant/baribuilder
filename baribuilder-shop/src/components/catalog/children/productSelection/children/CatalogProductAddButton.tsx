import {Button} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {DataProps, graphql, MutateProps} from 'react-apollo';
import {toast} from 'react-toastify';
import {compose, pure} from 'recompose';
import {PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY} from '../../../../../app/BuilderApp';
import {trackButtonClick} from '../../../../../lib/analytics';
import {AddProduct, AddProductVariables} from '../../../../../typings/gql/AddProduct';
import {GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity} from '../../../../../typings/gql/GetClientCatalogProductQuantities';

interface IProps {
  catalogProductId: string;
  quantity: GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity;
  onAddToRegimen?: () => void;
}

const ADD_PRODUCT_MUTATION = gql`
    mutation AddProduct($catalogProductId: ID!, $amount: Int!, $frequency: FREQUENCY!, $units: PRODUCT_QUANTITY_UNITS!) {
        AddProductToCurrentRegimen(
            catalogProductId: $catalogProductId,
            amount: $amount,
            frequency: $frequency,
            units: $units
        ) @client {
            products {
                catalogProductId
            }
        }
    }
`;

type GraphqlOutputProps =
  Partial<DataProps<AddProduct, AddProductVariables>>
  & Partial<MutateProps<AddProduct, AddProductVariables>>;

const withAddMutation = graphql<IProps, AddProduct, AddProductVariables, GraphqlOutputProps>(ADD_PRODUCT_MUTATION, {
  options: ({catalogProductId, quantity: {amount, frequency, units}}) => ({
    variables: {
      catalogProductId,
      amount,
      frequency,
      units,
    },
    refetchQueries: [{query: PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}],
  }),
});

const enhance = compose<IProps & GraphqlOutputProps, IProps>(
  withAddMutation,
  pure,
);

// Pure
const CatalogProductAddButtonPure: SFC<IProps & GraphqlOutputProps> = ({mutate, onAddToRegimen, quantity, catalogProductId}) => {
  const handleClick = () => {
    trackButtonClick('Add Product', catalogProductId);
    if (mutate) {
      mutate()
        .then(response => {
          if (response && !response.errors) {
            toast.success(`${quantity.amount} ${quantity.units.toLowerCase()} of product added.`);
          }
        });
      if (onAddToRegimen) {
        onAddToRegimen();
      }
    } else {
      console.error('mutate undefined')
    }
  };
  return (
    <Button
      variant='contained'
      color='default'
      fullWidth
      onClick={handleClick}>
      Add To Regimen
    </Button>
  );
};

export default enhance(CatalogProductAddButtonPure);
