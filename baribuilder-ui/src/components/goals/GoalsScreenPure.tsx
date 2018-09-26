import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {IDesiredIngredients} from '../../state/client-schema-types';
import {EmptyRow} from '../style/Layout';
import {Header} from '../style/Typography';
import IngredientRangeSelection from './children/IngredientRangeSelection';
import {HandleChangeGoalFunc, HandleRemoveGoalFunc} from './GoalsScreen';

interface IProps {
  desiredIngredients?: IDesiredIngredients;
  onChangeGoal: HandleChangeGoalFunc;
  onRemoveGoal: HandleRemoveGoalFunc;
}

const GoalsScreenPure: SFC<IProps> = (props) => {
  return (
    <Grid container alignContent='flex-start'>
      <EmptyRow/>
      <Grid item lg={12}>
        <Header dark>What are your ingredient goals?</Header>
      </Grid>
      <EmptyRow mobile='20px'/>
      <Fragment>
        <Grid item lg={1}/>
        <Grid item container lg={10} alignContent='flex-start'>
          {props.desiredIngredients ? props.desiredIngredients.ingredientRanges.map((ingredientRange, i) => (
            <Grid item lg={12} key={i}>
              <IngredientRangeSelection ingredientRange={ingredientRange} onChange={props.onChangeGoal} onRemove={props.onRemoveGoal}/>
            </Grid>
          )) : null}
        </Grid>
        <Grid item lg={1}/>
      </Fragment>
      <Fragment>
        <Grid item lg={1}/>
        <Grid item lg={10}>
          Add ingredient
        </Grid>
        <Grid item lg={1}/>
      </Fragment>
      <Grid item lg={12}>
        Footer bar
      </Grid>
      <EmptyRow/>
    </Grid>
  )
};

export default GoalsScreenPure;
