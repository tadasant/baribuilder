import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {DataProps, graphql, MutateProps} from 'react-apollo';
import {toast} from 'react-toastify';
import {compose, pure} from "recompose";
import {PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY} from '../../../../app/BuilderApp';
import XIcon from '../../../../assets/icon/x.svg';
import {
  DeleteCurrentRegimenProductQuantity,
  DeleteCurrentRegimenProductQuantityVariables
} from '../../../../typings/gql/DeleteCurrentRegimenProductQuantity';
import {XIconImg} from '../../../goals/children/IngredientRangeSelection';

interface IProps {
  catalogProductId: string;
}


const REGIMEN_PRODUCT_QUANTITY_DELETE_MUTATION = gql`
    mutation DeleteCurrentRegimenProductQuantity($catalogProductId: ID!) {
        DeleteCurrentRegimenProductQuantity(
            catalogProductId: $catalogProductId,
        ) @client {
            products {
                catalogProductId
            }
        }
    }
`;

type MutationOutputProps =
  Partial<DataProps<DeleteCurrentRegimenProductQuantity, DeleteCurrentRegimenProductQuantityVariables>>
  & Partial<MutateProps<DeleteCurrentRegimenProductQuantity, DeleteCurrentRegimenProductQuantityVariables>>;

const withMutation = graphql<IProps, DeleteCurrentRegimenProductQuantity>(REGIMEN_PRODUCT_QUANTITY_DELETE_MUTATION, {
  options: ({catalogProductId}) => ({
    variables: {catalogProductId},
    refetchQueries: [{query: PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}],
  }),
});

const enhance = compose<IProps & MutationOutputProps, IProps>(
  withMutation,
  pure,
);


const XRegimenProductIcon: SFC<MutationOutputProps & IProps> = ({mutate}) => {
  if (!mutate) {
    console.warn('Mutate unavailable. Error code 952838.');
    return null;
  }
  const handleClick = () => {
    mutate()
      .then(response => {
        if (response && !response.errors) {
          toast.success(`Removed product.`);
        }
      });
  }
  return <XIconImg src={XIcon} onClick={handleClick}/>;
};

export default enhance(XRegimenProductIcon);
