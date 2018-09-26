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
import {GetIngredientReferenceData} from '../../../typings/gql/GetIngredientReferenceData';
import {Body} from '../../style/Typography';
import {HandleChangeGoalFunc} from '../GoalsScreen';

interface IProps {
  ingredientRange: IIngredientRange,
  onChange: HandleChangeGoalFunc,
}

const GET_INGREDIENT_REFERENCE_DATA = gql`
    query GetIngredientReferenceData {
        allIngredientTypes {
            name
            defaultUnits
            synonyms
        }
        FREQUENCIES: __type(name: "FREQUENCY") {
            enumValues {
                name
            }
        }
        INGREDIENT_QUANTITY_UNITSES: __type(name: "INGREDIENT_QUANTITY_UNITS") {
            enumValues {
                name
            }
        }
    }
`;

type ReferenceDataOutputProps = ChildDataProps<IProps, GetIngredientReferenceData>;

const withReferenceData = graphql<IProps, GetIngredientReferenceData>(GET_INGREDIENT_REFERENCE_DATA);

const CenteredBody = styled(Body)`
  text-align: center;
`;

const ShadowedSelect = styled(Select)`
  && {
    box-shadow: 0px 1px 2px 0px ${Sketch.color.accent.grey};
    width: 100%;
    text-align: center;
    color: ${Sketch.color.accent.black};
  }
`;

const EmphasizedShadowedSelect = styled(ShadowedSelect)`
  && {
    font-weight: 800;
    font-size: 1.5em;
  }
`;


const IngredientRangeSelection: SFC<ReferenceDataOutputProps & IProps> = ({ingredientRange, onChange, data: {allIngredientTypes, FREQUENCIES, INGREDIENT_QUANTITY_UNITSES}}) => {
  const handleChangeIngredientTypeName: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'ingredientTypeName', event.target.value);
  };
  const handleChangeUnits: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'units', event.target.value);
  };
  const handleChangeFrequency: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'frequency', event.target.value);
  };

  return (
    <Grid container direction='row' spacing={8}>
      <Grid item lg={2}>
        <EmphasizedShadowedSelect value={ingredientRange.ingredientTypeName} onChange={handleChangeIngredientTypeName}>
          {allIngredientTypes ? allIngredientTypes.map(ingredientType => (
            <MenuItem value={ingredientType.name} key={ingredientType.name}>{ingredientType.name}</MenuItem>
          )) : null}
        </EmphasizedShadowedSelect>
      </Grid>
      <Grid item lg={1} container direction='column' justify='center'>
        <Grid item>
          <CenteredBody dark>from</CenteredBody>
        </Grid>
      </Grid>
      <Grid item lg={2}>
        {ingredientRange.minimumAmount}
      </Grid>
      <Grid item lg={1} container direction='column' justify='center'>
        <Grid item>
          <CenteredBody dark>to</CenteredBody>
        </Grid>
      </Grid>
      <Grid item lg={2}>
        {ingredientRange.maximumAmount}
      </Grid>
      <Grid item lg={1} container direction='column' justify='center'>
        <Grid item>
          <ShadowedSelect value={ingredientRange.units} onChange={handleChangeUnits}>
            {INGREDIENT_QUANTITY_UNITSES && INGREDIENT_QUANTITY_UNITSES.enumValues ? INGREDIENT_QUANTITY_UNITSES.enumValues.map(units => (
              <MenuItem value={units.name} key={units.name}>{units.name}</MenuItem>
            )) : null}
          </ShadowedSelect>
        </Grid>
      </Grid>
      <Grid item container lg={3}>
        <Grid item lg={10} container direction='column' justify='center'>
          <Grid item>
            <ShadowedSelect value={ingredientRange.frequency} onChange={handleChangeFrequency}>
              {FREQUENCIES && FREQUENCIES.enumValues ? FREQUENCIES.enumValues.map(frequency => (
                <MenuItem value={frequency.name} key={frequency.name}>{frequency.name}</MenuItem>
              )) : null}
            </ShadowedSelect>
          </Grid>
        </Grid>
        <Grid item lg={2}>
          x
        </Grid>
      </Grid>
    </Grid>
  )
};

export default withReferenceData(IngredientRangeSelection);
