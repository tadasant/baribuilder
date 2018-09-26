import update from 'immutability-helper';
import * as React from 'react';
import {Component} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {IDesiredIngredients, IIngredientRange} from '../../state/client-schema-types';
import {DESIRED_INGREDIENTS_QUERY} from '../../state/resolvers/resolver/queries';
import {GetDesiredIngredients} from '../../typings/gql/GetDesiredIngredients';
import GoalsScreenPure from './GoalsScreenPure';

type DataOutputProps = ChildDataProps<{}, GetDesiredIngredients>;

const withData = graphql<{}, GetDesiredIngredients>(DESIRED_INGREDIENTS_QUERY);

interface IState {
  desiredIngredients?: IDesiredIngredients;
  didMakeClientSideChanges: boolean; // Used for preventing remote changes from overwriting local ones
}

// TODO stricter `value`
export type HandleChangeGoalFunc = (ingredientTypeName: string, key: keyof IIngredientRange, value: string | undefined) => void;

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
      case 'minimumAmount': case 'maximumAmount': finalValue = value === undefined ? null : parseFloat(value); break;
      default: finalValue = value || null;
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

  render() {
    return (
      <GoalsScreenPure
        desiredIngredients={this.state.desiredIngredients}
        onChangeGoal={this.handleChangeGoal}
      />
    );
  }
}

export default withData(GoalsScreenContainer);
