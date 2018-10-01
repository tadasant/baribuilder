import gql from 'graphql-tag';
import update from 'immutability-helper';
import * as React from 'react';
import {Component} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from "recompose";
import {IDesiredIngredients, IIngredientRange} from '../../state/client-schema-types';
import '../../state/fragments.graphql';
import {GetGoalsScreenData} from '../../typings/gql/GetGoalsScreenData';
import {FREQUENCY} from '../../typings/gql/globalTypes';
import {SetDesiredIngredients, SetDesiredIngredientsVariables} from '../../typings/gql/SetDesiredIngredients';
import {GET_PREFETCH_QUERY_CLIENT} from '../builder/BuilderScreen';
import GoalsScreenPure from './GoalsScreenPure';

const GOALS_SCREEN_QUERY = gql`
    query GetGoalsScreenData {
        desiredIngredients @client {
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

const DESIRED_INGREDIENTS_MUTATION = gql`
    mutation SetDesiredIngredients($desiredIngredients: DesiredIngredientsInput!) {
        SetDesiredIngredients(
            desiredIngredients: $desiredIngredients,
        ) @client {
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

type QueryOutputProps = ChildDataProps<{}, GetGoalsScreenData>;

type MutationOutputProps =
  Partial<DataProps<SetDesiredIngredients, SetDesiredIngredientsVariables>>
  & Partial<MutateProps<SetDesiredIngredients, SetDesiredIngredientsVariables>>;

const withData = graphql<{}, GetGoalsScreenData>(GOALS_SCREEN_QUERY);
const withMutation = graphql<{}, SetDesiredIngredients>(DESIRED_INGREDIENTS_MUTATION, {
  options: {
    refetchQueries: [{query: GET_PREFETCH_QUERY_CLIENT}],
  }
});

const enhance = compose<QueryOutputProps & MutationOutputProps & RouteComponentProps, {}>(
  withData,
  withMutation,
  withRouter,
);

interface IState {
  desiredIngredients?: IDesiredIngredients;
  didMakeClientSideChanges: boolean; // Used for preventing remote changes from overwriting local ones
}

export type HandleChangeGoalFunc = (ingredientTypeName: string, key: keyof IIngredientRange, value: string | undefined) => void;
export type HandleRemoveGoalFunc = (ingredientTypeName: string) => void;
export type HandleAddGoalFunc = () => void;

type TProps = QueryOutputProps & MutationOutputProps & RouteComponentProps;

class GoalsScreenContainer extends Component<TProps, Readonly<IState>> {
  static getDerivedStateFromProps(props: TProps, state: IState) {
    // TODO consider replacing w/ key strategy https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html?no-cache=1#recommendation-fully-uncontrolled-component-with-a-key
    if (!state.didMakeClientSideChanges) {
      return {
        desiredIngredients: props.data.desiredIngredients,
      }
    }
    return null;
  }

  state: IState = {
    didMakeClientSideChanges: false,
  };

  constructor(props: TProps) {
    super(props);
    this.handleChangeGoal = this.handleChangeGoal.bind(this);
    this.handleRemoveGoal = this.handleRemoveGoal.bind(this);
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.handleSetAndBrowse = this.handleSetAndBrowse.bind(this);
  }

  /**
   * @param ingredientTypeName Note odd situation where I'm somewhat keying the fields off of ingredientTypeName, but user might change ingredientTypeName
   * @param key IngredientRange key e.g. ingreidentTypeName, minimumAmount, maximumAmount, frequency, units
   * @param value value to set
   */
  // TODO replace keying by name to use index instead
  handleChangeGoal: HandleChangeGoalFunc = (ingredientTypeName, key, value) => {
    if (!this.state.desiredIngredients) {
      return;
    }

    // Standardize types from UI to real data
    let finalValue: number | string | null;
    switch (key) {
      case 'minimumAmount':
      case 'maximumAmount':
        finalValue = value === undefined ? null : parseFloat(value);
        break;
      default:
        finalValue = value || null;
    }

    const rangeIndex = this.state.desiredIngredients.ingredientRanges.findIndex(range => range.ingredientTypeName === ingredientTypeName);
    const updatedState = {
      desiredIngredients: {
        ingredientRanges: {
          [rangeIndex]: {
            [key]: {$set: finalValue}
          }
        }
      },
      didMakeClientSideChanges: {$set: true},
    };

    if (key === 'ingredientTypeName') {
      // Reset the whole row since we're effectively changing the "PK"
      if (!this.props.data.allIngredientTypes) {
        console.warn('allIngredientTypes not loaded. Error code 13873');
        return;
      }
      const ingredientType = this.props.data.allIngredientTypes.find(i => i.name === value);
      if (!ingredientType) {
        console.warn('ingredientType key not found. Error code 13873');
        return;
      }
      updatedState.desiredIngredients.ingredientRanges[rangeIndex] = {
        minimumAmount: {$set: null},
        maximumAmount: {$set: null},
        units: {$set: ingredientType.defaultUnits},
        frequency: {$set: FREQUENCY.DAILY},
      }
    }

    this.setState(update(this.state, updatedState));
  };

  handleRemoveGoal: HandleRemoveGoalFunc = (ingredientTypeName) => {
    if (!this.state.desiredIngredients) {
      return;
    }

    const rangeIndex = this.state.desiredIngredients.ingredientRanges.findIndex(range => range.ingredientTypeName === ingredientTypeName);
    this.setState(update(this.state, {
      desiredIngredients: {
        ingredientRanges: {
          $splice: [[rangeIndex, 1]],
        }
      },
      didMakeClientSideChanges: {$set: true},
    }));
  };

  handleAddGoal: HandleAddGoalFunc = () => {
    if (!this.props.data || !this.props.data.allIngredientTypes) {
      console.error('Failed to load ref data. Error code 392503122');
      return;
    }

    const currentIngredientTypes = this.state.desiredIngredients ? this.state.desiredIngredients.ingredientRanges.map(range => range.ingredientTypeName) : [];
    const ingredientType = this.props.data.allIngredientTypes.find(i => currentIngredientTypes.indexOf(i.name) === -1);
    if (!ingredientType) {
      console.warn('No more ingredients available. Error code 392503122');
      return;
    }

    this.setState(update(this.state, {
      desiredIngredients: {
        ingredientRanges: {
          $push: [{
            __typename: 'IngredientRange',
            ingredientTypeName: ingredientType.name,
            minimumAmount: null,
            maximumAmount: null,
            units: ingredientType.defaultUnits,
            frequency: FREQUENCY.DAILY,
          }],
        }
      },
      didMakeClientSideChanges: {$set: true},
    }));
  };

  handleSetAndBrowse = (): void => {
    if (!this.props.mutate || !this.state.desiredIngredients) {
      console.error('mutate or desiredIngredients undefined, error code 59329083');
      return;
    }
    this.props.mutate({
      variables: {
        desiredIngredients: this.state.desiredIngredients
      }
    });
    this.props.history.push('/browse/all_products');
  };

  render() {
    return (
      <GoalsScreenPure
        desiredIngredients={this.state.desiredIngredients}
        onChangeGoal={this.handleChangeGoal}
        onRemoveGoal={this.handleRemoveGoal}
        onAddGoal={this.handleAddGoal}
        onSetAndBrowse={this.handleSetAndBrowse}
      />
    );
  }
}

export default enhance(GoalsScreenContainer);
