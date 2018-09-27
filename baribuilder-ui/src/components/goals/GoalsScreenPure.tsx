import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {IDesiredIngredients} from '../../state/client-schema-types';
import {EmptyRow} from '../style/Layout';
import {Caption, Header} from '../style/Typography';
import IngredientRangeSelection from './children/IngredientRangeSelection';
import {HandleAddGoalFunc, HandleChangeGoalFunc, HandleRemoveGoalFunc} from './GoalsScreen';

interface IProps {
  desiredIngredients?: IDesiredIngredients;
  onChangeGoal: HandleChangeGoalFunc;
  onRemoveGoal: HandleRemoveGoalFunc;
  onAddGoal: HandleAddGoalFunc;
}

const AddBoxGrid = styled(Grid)`
  height: 3em;
  border-color: ${Sketch.color.accent.darkgrey};
  border-style: dashed;
  border-width: 1px;
  cursor: pointer;
`;

const GreyCaption = styled(Caption)`
  color: ${Sketch.color.accent.darkgrey};
`;

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
        <Grid item container lg={10} alignContent='flex-start' spacing={8}>
          {props.desiredIngredients ? props.desiredIngredients.ingredientRanges.map((ingredientRange, i) => (
            <Grid item lg={12} key={i}>
              <IngredientRangeSelection ingredientRange={ingredientRange} onChange={props.onChangeGoal}
                                        onRemove={props.onRemoveGoal}/>
            </Grid>
          )) : null}
        </Grid>
        <Grid item lg={1}/>
      </Fragment>
      <EmptyRow/>
      <Fragment>
        <Grid item lg={1}/>
        <AddBoxGrid item lg={10} container direction='column' justify='center'>
          <Grid item>
            <GreyCaption onClick={props.onAddGoal}>Click to add ingredient</GreyCaption>
          </Grid>
        </AddBoxGrid>
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
