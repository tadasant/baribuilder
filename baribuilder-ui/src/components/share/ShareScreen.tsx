import gql from 'graphql-tag';
import * as qs from 'qs';
import * as React from 'react';
import {Component} from 'react';
import {DataProps, DataValue, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {toast} from 'react-toastify';
import {compose} from 'recompose';
import {PREFETCH_CATALOG_PRODUCTS_QUERY, PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY} from '../../app/BuilderApp';
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

class ShareScreen extends Component<RouteComponentProps & MutationOutputProps> {
  deriveStoreFromQueryParams(): DataValue<GetStoreToShare, {}> | null {
    const queryString = this.props.location.search;
    try {
      return qs.parse(queryString.slice(1));
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
      toast.error(`Error loading shared URL! Please contact feedback@vitaglab.com if you think this is a mistake. Error 01987 @ ${(new Date).getTime()}`, {
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
    }).then(({errors}) => {
      if (errors) {
        toast.error(`Error loading shared URL! Please contact feedback@vitaglab.com if you think this is a mistake. Error 01988 @ ${(new Date).getTime()}`, {
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
    refetchQueries: [{query: PREFETCH_CATALOG_PRODUCTS_QUERY}, {query: PREFETCH_CLIENT_CATALOG_PRODUCTS_QUERY}],
  }),
});

const enhance = compose<{}, RouteComponentProps & MutationOutputProps>(
  withMutation,
  withRouter
);

export default enhance(ShareScreen);
