import gql from 'graphql-tag';
import update from 'immutability-helper';
import * as React from 'react';
import {Component, Fragment} from 'react';
import {ChildDataProps, DataProps, graphql, MutateProps} from 'react-apollo';
import {RouteComponentProps, withRouter} from 'react-router';
import {toast} from 'react-toastify';
import {compose} from "recompose";
import {compareIngredientTypeNames} from '../../lib/constants';
import {IGoalIngredients, IIngredientRange} from '../../state/client-schema-types';
import '../../state/fragments.graphql';
import {GetGoalsScreenData} from '../../typings/gql/GetGoalsScreenData';
import {FREQUENCY} from '../../typings/gql/globalTypes';
import {SetGoalIngredients, SetGoalIngredientsVariables} from '../../typings/gql/SetGoalIngredients';
import CurationRedirectModal from './CurationRedirectModal';
import GoalsScreenPure from './GoalsScreenPure';
import {CUSTOM_TEMPLATE_NAME} from './templates/CustomTemplate';
import {BYPASS_TEMPLATE_NAME} from './templates/GastricBypassASMBS';
import {SLEEVE_TEMPLATE_NAME} from './templates/GastricSleeveASMBS';
import templatesByName, {DEFAULT_TEMPLATE_NAME} from './templates/templates';

interface IProps {
  initialState?: IGoalsScreenState
}

const GOALS_SCREEN_QUERY = gql`
    query GetGoalsScreenData {
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

export interface IGoalsScreenState {
  goalIngredients?: IGoalIngredients;
  selectedTemplateName: string;
  showRedirectModal?: boolean;
}

export type HandleChangeGoalFunc = (ingredientTypeName: string, key: keyof IIngredientRange, value: string | undefined) => void;
export type HandleRemoveGoalFunc = (ingredientTypeName: string) => void;
export type HandleChangeTemplate = (templateName: string) => void;
export type HandleAddGoalFunc = () => void;

type TProps = IProps & QueryOutputProps & MutationOutputProps & RouteComponentProps;

class GoalsScreen extends Component<TProps, Readonly<IGoalsScreenState>> {
  constructor(props: TProps) {
    super(props);
    this.state = props.initialState || templatesByName[DEFAULT_TEMPLATE_NAME];
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
  handleChangeGoal: HandleChangeGoalFunc = (ingredientTypeName, key, value) => {
    if (!this.state.goalIngredients) {
      return;
    }

    // Standardize types from UI to real data
    let finalValue: number | string | null;
    switch (key) {
      case 'minimumAmount':
      case 'maximumAmount':
        finalValue = value === undefined || value === '' ? null : parseFloat(value);
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
      selectedTemplateName: {
        $set: CUSTOM_TEMPLATE_NAME
      }
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
      selectedTemplateName: {
        $set: CUSTOM_TEMPLATE_NAME
      }
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
      selectedTemplateName: {
        $set: CUSTOM_TEMPLATE_NAME
      },
    }));
  };

  handleSetAndBrowse = (): void => {
    if (this.state.selectedTemplateName === SLEEVE_TEMPLATE_NAME || this.state.selectedTemplateName === BYPASS_TEMPLATE_NAME) {
      this.setState({showRedirectModal: true});
    } else {
      this.updateIngredients();
    }
  };

  updateIngredients = (): void => {
    if (!this.props.mutate || !this.state.goalIngredients) {
      console.error('mutate or goalIngredients undefined, error code 59329083');
      return;
    }

    this.props.mutate({
      variables: {
        goalIngredients: this.state.goalIngredients
      }
    }).then((response) => {
      if (response && response.errors) {
        toast.error(`Error setting goals! Please contact feedback@baribuilder.com if you think this is a mistake. Error 96572 @ ${(new Date).getTime()}`, {
          autoClose: false,
          closeOnClick: false,
        });
      } else {
        this.props.history.push('/browse/all_products');
        toast.success('Goals successfully set.');
      }
    });
  };

  handleChangeTemplate = (templateName: string): void => {
    this.setState(templatesByName[templateName]);
  };

  render() {
    if (this.props.data.allIngredientTypes) {
      this.props.data.allIngredientTypes.sort((i1, i2) => compareIngredientTypeNames(i1.name, i2.name));
    }
    return (
      <Fragment>
        <CurationRedirectModal
          template={this.state.selectedTemplateName}
          show={this.state.showRedirectModal}
          onProceed={this.updateIngredients}
          onClose={() => this.setState({showRedirectModal: false})}
        />
        <GoalsScreenPure
          goalIngredients={this.state.goalIngredients}
          selectedTemplateName={this.state.selectedTemplateName}
          onChangeTemplate={this.handleChangeTemplate}
          onChangeGoal={this.handleChangeGoal}
          onRemoveGoal={this.handleRemoveGoal}
          onAddGoal={this.handleAddGoal}
          onSetAndBrowse={this.handleSetAndBrowse}
        />
      </Fragment>
    );
  }
}

const withData = graphql<{}, GetGoalsScreenData>(GOALS_SCREEN_QUERY);

const withMutation = graphql<{}, SetGoalIngredients>(GOAL_INGREDIENTS_MUTATION, {
  options: {
    refetchQueries: ['PrefetchClientCatalogProducts'],
  }
});

const enhance = compose<TProps, IProps>(
  withData,
  withMutation,
  withRouter,
);

export default enhance(GoalsScreen);
