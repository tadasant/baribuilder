import {Grid} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import {IIngredientRange} from '../../../state/client-schema-types';
import {Body} from '../../style/Typography';
import {HandleChangeGoalFunc} from '../GoalsScreen';

interface IProps {
  ingredientRange: IIngredientRange,
  onChange: HandleChangeGoalFunc,
}

const CenteredBody = styled(Body)`
  text-align: center;
`;

const IngredientRangeSelection: SFC<IProps> = ({ingredientRange}) => {
  return (
    <Grid container direction='row'>
      <Grid item lg={2}>
        {ingredientRange.ingredientTypeName}
      </Grid>
      <Grid item lg={1}>
        <CenteredBody dark>from</CenteredBody>
      </Grid>
      <Grid item lg={2}>
        {ingredientRange.minimum ? ingredientRange.minimum.amount : 'none'}
      </Grid>
      <Grid item lg={1}>
        <CenteredBody dark>to</CenteredBody>
      </Grid>
      <Grid item lg={2}>
        {ingredientRange.maximum ? ingredientRange.maximum.amount : 'none'}
      </Grid>
      <Grid item container lg={3}>
        <Grid item lg={10}>
          {ingredientRange.frequency}
        </Grid>
        <Grid item lg={2}>
          x
        </Grid>
      </Grid>
    </Grid>
  )
};

export default IngredientRangeSelection;
