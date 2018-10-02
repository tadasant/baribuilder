import {Button} from '@material-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {DataProps, graphql, MutateProps} from 'react-apollo';
import {compose, pure} from 'recompose';
import {AddProduct, AddProductVariables} from '../../../../../typings/gql/AddProduct';
import {GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity} from '../../../../../typings/gql/GetClientCatalogProductQuantities';
import {GET_PREFETCH_QUERY_CLIENT} from '../../../BuilderScreen';

interface IProps {
  catalogProductId: string;
  quantity: GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity;
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
    refetchQueries: [{query: GET_PREFETCH_QUERY_CLIENT}],
  }),
});

const enhance = compose<IProps & GraphqlOutputProps, IProps>(
  withAddMutation,
  pure,
);

// Pure
const CatalogProductAddButtonPure: SFC<IProps & GraphqlOutputProps> = ({mutate}) => {
  const handleClick = mutate || (() => console.error('mutate undefined'));
  return (
    <Button
      variant='raised'
      color='default'
      fullWidth
      onClick={handleClick}>
      Add
    </Button>
  );
};

export default enhance(CatalogProductAddButtonPure);
