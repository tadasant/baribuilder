import {Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import gql from 'graphql-tag';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import Sketch from '../../../app/style/SketchVariables';
import {IIngredientRange} from '../../../state/client-schema-types';
import {GetIngredientTypes} from '../../../typings/gql/GetIngredientTypes';
import {Body} from '../../style/Typography';
import {HandleChangeGoalFunc} from '../GoalsScreen';

interface IProps {
  ingredientRange: IIngredientRange,
  onChange: HandleChangeGoalFunc,
}

const GET_INGREDIENT_TYPES = gql`
    query GetIngredientTypes {
        allIngredientTypes {
            name
            defaultUnits
            synonyms
        }
    }
`;

type ReferenceDataOutputProps = ChildDataProps<IProps, GetIngredientTypes>;

const withReferenceData = graphql<IProps, GetIngredientTypes>(GET_INGREDIENT_TYPES);

const CenteredBody = styled(Body)`
  text-align: center;
`;

const ShadowedSelect = styled(Select)`
  && {
    box-shadow: 0px 1px 2px 0px ${Sketch.color.accent.grey};
    font-weight: 800;
    font-size: 1.5em;
    width: 100%;
    text-align: center;
  }
`;

const IngredientRangeSelection: SFC<ReferenceDataOutputProps & IProps> = ({ingredientRange, onChange, data: {allIngredientTypes}}) => {
  const handleChangeIngredientTypeName: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'ingredientTypeName', event.target.value);
  };

  return (
    <Grid container direction='row'>
      <Grid item lg={2}>
        <ShadowedSelect value={ingredientRange.ingredientTypeName} onChange={handleChangeIngredientTypeName}>
          {allIngredientTypes ? allIngredientTypes.map(ingredientType => (
            <MenuItem value={ingredientType.name}>{ingredientType.name}</MenuItem>
          )) : null}
        </ShadowedSelect>
      </Grid>
      <Grid item lg={1} container direction='column' justify='center'>
        <Grid item>
          <CenteredBody dark>from</CenteredBody>
        </Grid>
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

export default withReferenceData(IngredientRangeSelection);
