import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import {IDesiredIngredients} from '../../state/client-schema-types';
import {EmptyRow} from '../style/Layout';
import {Header} from '../style/Typography';
import {HandleChangeGoalFunc} from './GoalsScreen';

interface IProps {
  desiredIngredients?: IDesiredIngredients,
  onChangeGoal: HandleChangeGoalFunc,
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
        <Grid item lg={10}>
          Ingredients:
          {props.desiredIngredients ? props.desiredIngredients.ingredientRanges.map(range => range.ingredientTypeName) : 'error'}
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
