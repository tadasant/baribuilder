import gql from 'graphql-tag';
import * as qs from 'qs';
import * as React from 'react';
import {Component} from 'react';
import {DataProps, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {toast} from 'react-toastify';
import {compose} from 'recompose';
import {PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY} from '../../app/BuilderApp';
import {IGoalIngredients, IIngredientRange, IRegimen, IRegimenProduct} from '../../state/client-schema-types';
import {DeleteCurrentRegimenProductQuantity} from '../../typings/gql/DeleteCurrentRegimenProductQuantity';
import {GetStoreToShare} from '../../typings/gql/GetStoreToShare';
import {ShareStoreMutation, ShareStoreMutationVariables} from '../../typings/gql/ShareStoreMutation';
import {CenteredSpinner} from '../catalog/CatalogScreen';

const SHARE_STORE_MUTATION = gql`
    mutation ShareStoreMutation($currentRegimen: RegimenInput!, $goalIngredients: GoalIngredientsInput!) {
        SetGoalIngredients(goalIngredients: $goalIngredients) @client {
            ingredientRanges {
                ingredientTypeName
            }
        }
        SetCurrentRegimen(currentRegimen: $currentRegimen) @client {
            products {
                catalogProductId
            }
        }
    }
`;

type MutationOutputProps =
  Partial<DataProps<ShareStoreMutation, ShareStoreMutationVariables>>
  & Partial<MutateProps<ShareStoreMutation, ShareStoreMutationVariables>>;

/* Assume parsedStore is correct, and morph it into type. This function should be surrounded with a try/catch. */
const stringifiedStoreToStore = (parsedStore: any): Partial<GetStoreToShare> => {
  const currentRegimenProducts: IRegimenProduct[] = [];
  if (parsedStore.currentRegimen.products) {
    parsedStore.currentRegimen.products.forEach((product: any) => {
      currentRegimenProducts.push({
        ...product,
        quantity: {
          ...product.quantity,
          amount: parseInt(product.quantity.amount, 10),
        },
        cost: {
          ...product.cost,
          money: parseFloat(product.cost.money),
        }
      })
    });
  }
  const currentRegimen: IRegimen = {
    __typename: 'Regimen',
    products: currentRegimenProducts,
  };

  const goalIngredientRanges: IIngredientRange[] = [];
  if (parsedStore.goalIngredients.ingredientRanges) {
    parsedStore.goalIngredients.ingredientRanges.forEach((ingredientRange: any) => {
      goalIngredientRanges.push({
        ...ingredientRange,
        maximumAmount: ingredientRange.maximumAmount ? parseFloat(ingredientRange.maximumAmount) : null,
        minimumAmount: ingredientRange.minimumAmount ? parseFloat(ingredientRange.minimumAmount) : null,
      })
    });
  }
  const goalIngredients: IGoalIngredients = {
    __typename: 'GoalIngredients',
    ingredientRanges: goalIngredientRanges,
  };
  return {currentRegimen, goalIngredients};
};

class ShareScreen extends Component<RouteComponentProps & MutationOutputProps> {
  deriveStoreFromQueryParams(): Partial<GetStoreToShare> | null {
    const queryString = this.props.location.search;
    try {
      return stringifiedStoreToStore(qs.parse(queryString.slice(1)));
    } catch {
      console.error('Failed to parse share URL. Error code 5682873');
      return null;
    }
  }

  componentDidMount() {
    if (!this.props.mutate) {
      return;
    }
    const storeValues = this.deriveStoreFromQueryParams();
    if (!storeValues || !storeValues.currentRegimen || !storeValues.goalIngredients) {
      toast.error(`Error loading shared URL! Please contact feedback@baribuilder.com if you think this is a mistake. Error 01987 @ ${(new Date).getTime()}`, {
        autoClose: false,
        closeOnClick: false,
      });
      this.props.history.push('/');
      return;
    }
    this.props.mutate({
      variables: {
        currentRegimen: storeValues.currentRegimen,
        goalIngredients: storeValues.goalIngredients
      }
    }).then((response) => {
      if (response && response.errors) {
        toast.error(`Error loading shared URL! Please contact feedback@baribuilder.com if you think this is a mistake. Error 01988 @ ${(new Date).getTime()}`, {
          autoClose: false,
          closeOnClick: false,
        });
        this.props.history.push('/');
      } else {
        toast.success('Loaded shared selections & products successfully!');
        this.props.history.push('/purchase');
      }
    });

  }

  render() {
    return <CenteredSpinner/>;
  }
}

const withMutation = graphql<{}, DeleteCurrentRegimenProductQuantity>(SHARE_STORE_MUTATION, {
  options: () => ({
    refetchQueries: [{query: PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}],
  }),
});

const enhance = compose<{}, RouteComponentProps & MutationOutputProps>(
  withMutation,
  withRouter
);

export default enhance(ShareScreen);
