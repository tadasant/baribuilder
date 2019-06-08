import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {compose, lifecycle} from 'recompose';
import '../../state/fragments.graphql';
import {GetGoalsScreenContainerData} from '../../typings/gql/GetGoalsScreenContainerData';
import GoalsScreen, {IGoalsScreenState} from './GoalsScreen';
import {CUSTOM_TEMPLATE_NAME} from './templates/CustomTemplate';

const GOALS_SCREEN_CONTAINER_QUERY = gql`
    query GetGoalsScreenContainerData {
        goalIngredients @client {
            ingredientRanges {
                ingredientTypeName
                minimumAmount
                maximumAmount
                units
                frequency
            }
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetGoalsScreenContainerData>;

const GoalsScreenContainer: SFC<QueryOutputProps> = ({data}) => {
  if (!data || !data.goalIngredients || data.loading) {
    return null;
  }
  // TODO refactor this full-state hack to be a robust templating system. Probably when/if I break out templating to be user-oriented
  let initialGoalsState: IGoalsScreenState | undefined = undefined;
  let key = 'default';
  if (data.goalIngredients.ingredientRanges.length > 0) {
    initialGoalsState = {
      selectedTemplateName: CUSTOM_TEMPLATE_NAME,
      goalIngredients: data.goalIngredients
    };
    key = `fromstore_${initialGoalsState.toString()}`;
  }
  // using keys to re-render child when store has changed
  return <GoalsScreen initialState={initialGoalsState} key={key}/>;
};

const withData = graphql<{}, GetGoalsScreenContainerData>(GOALS_SCREEN_CONTAINER_QUERY);

const enhance = compose<QueryOutputProps, {}>(
  lifecycle({
    componentDidMount() {
      window.scrollTo(0, 0);
    }
  }),
  withData
);

export default enhance(GoalsScreenContainer);
