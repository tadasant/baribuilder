import gql from 'graphql-tag';
import * as React from 'react';
import {Component} from 'react';
import {DataProps, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from 'recompose';
import {DeleteCurrentRegimenProductQuantity} from '../../typings/gql/DeleteCurrentRegimenProductQuantity';
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
  componentDidMount() {
    // TODO
    // pull the query string
    // attempt to push it to graphql
    // const {mutate} = this.props;
    // toast success or error message
    // push user to /purchase if success
    // push user to root if failure
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
