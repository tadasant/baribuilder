import * as copy from 'copy-to-clipboard';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import * as qs from 'qs';
import * as React from 'react';
import {Component} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {compose} from "recompose";
import {compareIngredientTypeNames} from '../../lib/constants';
import {IGoalIngredients, IIngredientRange} from '../../state/client-schema-types';
import '../../state/fragments.graphql';
import {GetGoalsScreenData} from '../../typings/gql/GetGoalsScreenData';
import {FREQUENCY} from '../../typings/gql/globalTypes';
import {SetGoalIngredients, SetGoalIngredientsVariables} from '../../typings/gql/SetGoalIngredients';
import {PREFETCH_GET_CLIENT_CATALOG} from '../catalog/CatalogScreen';
import GoalsScreenPure from './GoalsScreenPure';

const GOALS_SCREEN_QUERY = gql`
    query GetGoalsScreenData {
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

const GOAL_INGREDIENTS_MUTATION = gql`
    mutation SetGoalIngredients($goalIngredients: GoalIngredientsInput!) {
        SetGoalIngredients(
            goalIngredients: $goalIngredients,
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
  Partial<DataProps<SetGoalIngredients, SetGoalIngredientsVariables>>
  & Partial<MutateProps<SetGoalIngredients, SetGoalIngredientsVariables>>;

const withData = graphql<{}, GetGoalsScreenData>(GOALS_SCREEN_QUERY);
const withMutation = graphql<{}, SetGoalIngredients>(GOAL_INGREDIENTS_MUTATION, {
  options: {
    refetchQueries: [{query: PREFETCH_GET_CLIENT_CATALOG}],
  }
});

const enhance = compose<QueryOutputProps & MutationOutputProps & RouteComponentProps, {}>(
  withData,
  withMutation,
  withRouter,
);

interface IState {
  goalIngredients?: IGoalIngredients;
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
        goalIngredients: props.data.goalIngredients,
      }
    }
    return null;
  }

  constructor(props: TProps) {
    super(props);
    this.state = this.deriveStateFromQueryParams();
    this.handleChangeGoal = this.handleChangeGoal.bind(this);
    this.handleRemoveGoal = this.handleRemoveGoal.bind(this);
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.handleSetAndBrowse = this.handleSetAndBrowse.bind(this);
  }

  deriveStateFromQueryParams(): IState {
    const queryString = this.props.location.search;
    if (!queryString) {
      return {
        didMakeClientSideChanges: false,
      };
    }
    return qs.parse(queryString.slice(1));
  }

  /**
   * @param ingredientTypeName Note odd situation where I'm somewhat keying the fields off of ingredientTypeName, but user might change ingredientTypeName
   * @param key IngredientRange key e.g. ingreidentTypeName, minimumAmount, maximumAmount, frequency, units
   * @param value value to set
   */
    // TODO replace keying by name to use index instead
  handleChangeGoal: HandleChangeGoalFunc = (ingredientTypeName, key, value) => {
    if (!this.state.goalIngredients) {
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

    const rangeIndex = this.state.goalIngredients.ingredientRanges.findIndex(range => range.ingredientTypeName === ingredientTypeName);
    const updatedState = {
      goalIngredients: {
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
      updatedState.goalIngredients.ingredientRanges[rangeIndex] = {
        ...updatedState.goalIngredients.ingredientRanges[rangeIndex],
        minimumAmount: {$set: null},
        maximumAmount: {$set: null},
        units: {$set: ingredientType.defaultUnits},
        frequency: {$set: FREQUENCY.DAILY},
      }
    }
    this.setState(update(this.state, updatedState));
  };

  handleRemoveGoal: HandleRemoveGoalFunc = (ingredientTypeName) => {
    if (!this.state.goalIngredients) {
      return;
    }

    const rangeIndex = this.state.goalIngredients.ingredientRanges.findIndex(range => range.ingredientTypeName === ingredientTypeName);
    this.setState(update(this.state, {
      goalIngredients: {
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

    const currentIngredientTypes = this.state.goalIngredients ? this.state.goalIngredients.ingredientRanges.map(range => range.ingredientTypeName) : [];
    const ingredientType = this.props.data.allIngredientTypes.find(i => currentIngredientTypes.indexOf(i.name) === -1);
    if (!ingredientType) {
      console.warn('No more ingredients available. Error code 392503122');
      return;
    }

    this.setState(update(this.state, {
      goalIngredients: {
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
    if (!this.props.mutate || !this.state.goalIngredients) {
      console.error('mutate or goalIngredients undefined, error code 59329083');
      return;
    }
    this.props.mutate({
      variables: {
        goalIngredients: this.state.goalIngredients
      }
    });
    this.props.history.push('/browse/all_products');
  };

  handleCopyURL = (): void => {
    const stateAsQueryString = qs.stringify({
      ...this.state,
      didMakeClientSideChanges: false,
    });
    const url = `${window.location.host}${this.props.location.pathname}?${stateAsQueryString}`;
    copy(url);
  };

  render() {
    if (this.props.data.allIngredientTypes) {
      this.props.data.allIngredientTypes.sort((i1, i2) => compareIngredientTypeNames(i1.name, i2.name));
    }
    return (
      <GoalsScreenPure
        goalIngredients={this.state.goalIngredients}
        onChangeGoal={this.handleChangeGoal}
        onRemoveGoal={this.handleRemoveGoal}
        onAddGoal={this.handleAddGoal}
        onSetAndBrowse={this.handleSetAndBrowse}
        onCopyURL={this.handleCopyURL}
      />
    );
  }
}

export default enhance(GoalsScreenContainer);
