import gql from 'graphql-tag';
import * as qs from 'qs';
import * as React from 'react';
import {Component} from 'react';
import {DataProps, DataValue, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from 'recompose';
import {DeleteCurrentRegimenProductQuantity} from '../../typings/gql/DeleteCurrentRegimenProductQuantity';
import {GetStoreToShare} from '../../typings/gql/GetStoreToShare';
import {ShareStoreMutation, ShareStoreMutationVariables} from '../../typings/gql/ShareStoreMutation';
import {CenteredSpinner, PREFETCH_GET_CATALOG, PREFETCH_GET_CLIENT_CATALOG} from '../builder/BuilderScreen';

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
      return;
    }
    this.props.mutate({
      variables: {
        currentRegimen: storeValues.currentRegimen,
        goalIngredients: storeValues.goalIngredients
      }
    }).then(({errors, data}) => {
      console.log(errors);
      console.log(data);
      // toast success or error message
      // push user to /purchase if success
      // push user to root if failure
    })
  }

  render() {
    return <CenteredSpinner />;
  }
}

const withMutation = graphql<{}, DeleteCurrentRegimenProductQuantity>(SHARE_STORE_MUTATION, {
  options: () => ({
    refetchQueries: [{query: PREFETCH_GET_CATALOG}, {query: PREFETCH_GET_CLIENT_CATALOG}],
  }),
});

const enhance = compose<{}, RouteComponentProps & MutationOutputProps>(
  withMutation,
  withRouter
);

export default enhance(ShareScreen);
