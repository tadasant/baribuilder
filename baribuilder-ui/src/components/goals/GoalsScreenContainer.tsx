import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import '../../state/fragments.graphql';
import {GetGoalsScreenContainerData} from '../../typings/gql/GetGoalsScreenContainerData';
import GoalsScreen from './GoalsScreen';

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
        allIngredientTypes {
            name
            defaultUnits
            synonyms
        }
    }
`;

type QueryOutputProps = ChildDataProps<{}, GetGoalsScreenContainerData>;

const GoalsScreenContainer: SFC<QueryOutputProps> = ({data}) => {
  if (!data || data.loading) {
    return null;
  }
  return <GoalsScreen data={data} key={data.toString()}/>;
};

const withData = graphql<{}, GetGoalsScreenContainerData>(GOALS_SCREEN_CONTAINER_QUERY);

export default withData(GoalsScreenContainer);
