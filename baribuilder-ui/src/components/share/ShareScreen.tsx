import gql from 'graphql-tag';
import * as qs from 'qs';
import * as React from 'react';
import {Component} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {toast} from 'react-toastify';
import {branch, compose, withProps} from 'recompose';
import {PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY} from '../../app/BuilderApp';
import {IGoalIngredients, IIngredientRange, IRegimen, IRegimenProduct} from '../../state/client-schema-types';
import {DeleteCurrentRegimenProductQuantity} from '../../typings/gql/DeleteCurrentRegimenProductQuantity';
import {GetSharedUrl, GetSharedUrlVariables} from '../../typings/gql/GetSharedUrl';
import {GetStoreToShare} from '../../typings/gql/GetStoreToShare';
import {ShareStoreMutation, ShareStoreMutationVariables} from '../../typings/gql/ShareStoreMutation';
import {CenteredSpinner} from '../catalog/CatalogScreen';
import {URL_ID_KEY} from '../purchase/children/SharingURLPanel';

const SHARE_QUERY = gql`
    query GetSharedUrl($id: ID!) {
        allUrls(filter: {id: $id}) {
            pathname
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetSharedUrl>;

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

type TProps = RouteComponentProps & MutationOutputProps & (QueryOutputProps | null);

class ShareScreen extends Component<TProps> {
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
    if (this.props.data && !this.props.data.loading) {
      // we have data (i.e. we pulled in a URL ID)
      if (this.props.data.allUrls && this.props.data.allUrls.length === 1) {
        // @ts-ignore check above
        this.props.history.push(this.props.data.allUrls[0].pathname);
      } else {
        toast.error(`Error loading shared URL! Please contact feedback@baribuilder.com if you think this is a mistake. Error 92382 @ ${(new Date).getTime()}`, {
          autoClose: false,
          closeOnClick: false,
        });
      }
    } else if (!this.props.data) {
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
  }

  render() {
    return <CenteredSpinner/>;
  }
}

const withData = graphql<RouteComponentProps, GetSharedUrl, GetSharedUrlVariables>(SHARE_QUERY, {
  options: (props: RouteComponentProps) => {
    const queryString = props.location.search;
    try {
      const parsedData = qs.parse(queryString.slice(1));
      return {
        variables: {id: parsedData[URL_ID_KEY]}
      };
    } catch {
      toast.error(`Error loading shared URL! Please contact feedback@baribuilder.com if you think this is a mistake. Error 193832 @ ${(new Date).getTime()}`, {
        autoClose: false,
        closeOnClick: false,
      });
      return {
        variables: {id: ''},
      }
    }
  }
});

const withMutation = graphql<{}, DeleteCurrentRegimenProductQuantity>(SHARE_STORE_MUTATION, {
  options: () => ({
    refetchQueries: [{query: PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}],
  }),
});

const enhance = compose<{}, RouteComponentProps & MutationOutputProps>(
  withMutation,
  withRouter,
  branch(
    (props: RouteComponentProps) => props.location.search.includes(URL_ID_KEY),
    withData
  ),
  withProps<{ key: string }, TProps>(
    (props) => (
      {
        ...props,
        key: `${props.data ? props.data.allUrls ? props.data.allUrls.toString() : 'no-urls' : 'no-data'}`
      }
    )
  ),
);

export default enhance(ShareScreen);
