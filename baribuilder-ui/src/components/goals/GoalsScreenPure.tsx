import {Grid} from '@material-ui/core';
import * as React from 'react';
import {Fragment, SFC} from 'react';
import styled from 'styled-components';
import Sketch from '../../app/style/SketchVariables';
import {IDesiredIngredients} from '../../state/client-schema-types';
import {EmptyRow} from '../style/Layout';
import {Caption, Header} from '../style/Typography';
import GoalsFooter from './children/GoalsFooter';
import IngredientRangeSelection from './children/IngredientRangeSelection';
import {HandleAddGoalFunc, HandleChangeGoalFunc, HandleRemoveGoalFunc} from './GoalsScreen';

interface IProps {
  desiredIngredients?: IDesiredIngredients;
  onChangeGoal: HandleChangeGoalFunc;
  onRemoveGoal: HandleRemoveGoalFunc;
  onAddGoal: HandleAddGoalFunc;
  onSetAndBrowse: () => void;
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

const Footer = styled.div`
  box-shadow: 0px -2px 4px 0px ${Sketch.color.accent.grey};
  height: 5em;
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: ${Sketch.color.background.white};
`;

const OuterGrid = styled(Grid)`
  && {
    min-height: 100vh;
  }
`;

const FooterGrid = styled(Grid)`
  && {
    height: 100%;
  }
`;

export const CenteredTextGrid = styled(Grid)`
  text-align: center;
`;

const CenteredTextGridWithPointer = styled(CenteredTextGrid)`
  cursor: pointer;
`;

const GoalsScreenPure: SFC<IProps> = (props) => {
  return (
    <Fragment>
      <OuterGrid container alignContent='flex-start'>
        <EmptyRow/>
        <CenteredTextGrid item lg={12}>
          <Header dark>What are your ingredient goals?</Header>
        </CenteredTextGrid>
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
            <CenteredTextGridWithPointer item onClick={props.onAddGoal}>
              <GreyCaption>Click to add ingredient</GreyCaption>
            </CenteredTextGridWithPointer>
          </AddBoxGrid>
          <Grid item lg={1}/>
        </Fragment>
      </OuterGrid>
      <Footer>
        <FooterGrid container direction='column' justify='center'>
          <Grid item container>
            <GoalsFooter onClickSetAndBrowse={props.onSetAndBrowse}/>
          </Grid>
        </FooterGrid>
      </Footer>
    </Fragment>
  )
};

export default GoalsScreenPure;
