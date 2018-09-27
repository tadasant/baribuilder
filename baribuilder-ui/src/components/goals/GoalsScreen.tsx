import gql from 'graphql-tag';
import update from 'immutability-helper';
import * as React from 'react';
import {Component} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {IDesiredIngredients, IIngredientRange} from '../../state/client-schema-types';
import '../../state/fragments.graphql';
import {GetGoalsScreenData} from '../../typings/gql/GetGoalsScreenData';
import {FREQUENCY} from '../../typings/gql/globalTypes';
import GoalsScreenPure from './GoalsScreenPure';

type DataOutputProps = ChildDataProps<{}, GetGoalsScreenData>;

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

const withData = graphql<{}, GetGoalsScreenData>(GOALS_SCREEN_QUERY);

interface IState {
  desiredIngredients?: IDesiredIngredients;
  didMakeClientSideChanges: boolean; // Used for preventing remote changes from overwriting local ones
}

export type HandleChangeGoalFunc = (ingredientTypeName: string, key: keyof IIngredientRange, value: string | undefined) => void;
export type HandleRemoveGoalFunc = (ingredientTypeName: string) => void;
export type HandleAddGoalFunc = () => void;

class GoalsScreenContainer extends Component<DataOutputProps, Readonly<IState>> {
  static getDerivedStateFromProps(props: DataOutputProps, state: IState) {
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

  constructor(props: DataOutputProps) {
    super(props);
    this.handleChangeGoal = this.handleChangeGoal.bind(this);
    this.handleRemoveGoal = this.handleRemoveGoal.bind(this);
    this.handleAddGoal = this.handleAddGoal.bind(this);
  }

  /**
   * @param ingredientTypeName Note odd situation where I'm somewhat keying the fields off of ingredientTypeName, but user might change ingredientTypeName
   * @param key IngredientRange key e.g. ingreidentTypeName, minimumAmount, maximumAmount, frequency, units
   * @param value value to set
   */
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
    this.setState(update(this.state, {
      desiredIngredients: {
        ingredientRanges: {
          [rangeIndex]: {
            [key]: {$set: finalValue}
          }
        }
      },
      didMakeClientSideChanges: {$set: true},
    }));
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

  render() {
    return (
      <GoalsScreenPure
        desiredIngredients={this.state.desiredIngredients}
        onChangeGoal={this.handleChangeGoal}
        onRemoveGoal={this.handleRemoveGoal}
        onAddGoal={this.handleAddGoal}
      />
    );
  }
}

export default withData(GoalsScreenContainer);
