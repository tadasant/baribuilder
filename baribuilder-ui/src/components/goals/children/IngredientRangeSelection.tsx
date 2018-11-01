import {Grid, Tooltip} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import {upperFirst} from 'lodash';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import styled from 'styled-components';
import XIcon from '../../../assets/icon/x.svg';
import {IIngredientRange} from '../../../state/client-schema-types';
import {
  GetIngredientReferenceData,
  GetIngredientReferenceData_allIngredientTypes
} from '../../../typings/gql/GetIngredientReferenceData';
import {ShadowedSelect} from '../../style/CustomMaterial';
import {Body} from '../../style/Typography';
import {HandleChangeGoalFunc, HandleRemoveGoalFunc} from '../GoalsScreen';
import {CenteredTextGrid} from '../GoalsScreenPure';

interface IProps {
  ingredientRange: IIngredientRange;
  onChange: HandleChangeGoalFunc;
  onRemove: HandleRemoveGoalFunc;
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

export const EmphasizedShadowedSelect = styled(ShadowedSelect)`
  && {
    font-weight: 800;
    font-size: 1.5em;
  }
`;

export const XIconImg = styled.img`
  max-height: 16px;
  text-align: center;
  cursor: pointer;
`;

const ingredientNameWithSynonymsDisplay = (ingredientType: GetIngredientReferenceData_allIngredientTypes) => {
  if (!ingredientType.synonyms || ingredientType.synonyms.length === 0) {
    return ingredientType.name;
  }
  const synonymDisplay = ingredientType.synonyms.map(s => upperFirst(s)).join(', ');
  return `${ingredientType.name} (${synonymDisplay})`
};

const IngredientRangeSelection: SFC<ReferenceDataOutputProps & IProps> = ({ingredientRange, onChange, onRemove, data: {allIngredientTypes}}) => {
  const handleChangeIngredientTypeName: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'ingredientTypeName', event.target.value);
  };
  const handleChangeUnits: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'units', event.target.value);
  };
  const handleChangeFrequency: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'frequency', event.target.value);
  };
  const handleRemove = (): void => {
    onRemove(ingredientRange.ingredientTypeName);
  };
  const handleMinimumChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'minimumAmount', event.target.value);
  };
  const handleMaximumChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChange(ingredientRange.ingredientTypeName, 'maximumAmount', event.target.value);
  };

  if (allIngredientTypes) {
    allIngredientTypes.sort((t1, t2) => t1.name.localeCompare(t2.name));
  }

  const currentIngredientType = allIngredientTypes ? allIngredientTypes.find(ingredientType => ingredientType.name === ingredientRange.ingredientTypeName) : undefined;
  const tooltipText = currentIngredientType ? ingredientNameWithSynonymsDisplay(currentIngredientType) : undefined;

  return (
    <Grid container direction='row' spacing={8}>
      <Grid item lg={3} container direction='column' justify='flex-end'>
        <Grid item>
          <Tooltip title={tooltipText || ''}>
            <EmphasizedShadowedSelect value={ingredientRange.ingredientTypeName}
                                      onChange={handleChangeIngredientTypeName}>
              {allIngredientTypes ? allIngredientTypes.map(ingredientType => (
                <MenuItem value={ingredientType.name}
                          key={ingredientType.name}>{ingredientNameWithSynonymsDisplay(ingredientType)}</MenuItem>
              )) : null}
            </EmphasizedShadowedSelect>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item lg={1} container direction='column' justify='flex-end'>
        <CenteredTextGrid item>
          <Body dark>from</Body>
        </CenteredTextGrid>
      </Grid>
      <Grid item lg={2} container direction='column' justify='flex-end'>
        <Grid item>
          <TextField
            onChange={handleMinimumChange} value={ingredientRange.minimumAmount || ''} fullWidth
            label='Minimum' inputProps={{dataHjWhitelist: true}}/>
        </Grid>
      </Grid>
      <Grid item lg={1} container direction='column' justify='flex-end'>
        <CenteredTextGrid item>
          <Body dark>to</Body>
        </CenteredTextGrid>
      </Grid>
      <Grid item lg={2} container direction='column' justify='flex-end'>
        <Grid item>
          <TextField onChange={handleMaximumChange} value={ingredientRange.maximumAmount || ''} fullWidth
                     label='Maximum' inputProps={{dataHjWhitelist: true}}/>
        </Grid>
      </Grid>
      <Grid item lg={1} container direction='column' justify='flex-end'>
        <Grid item>
          <ShadowedSelect value={ingredientRange.units} onChange={handleChangeUnits}>
            {/* Disabling while feature unimplemented */}
            {/*{INGREDIENT_QUANTITY_UNITSES && INGREDIENT_QUANTITY_UNITSES.enumValues ? INGREDIENT_QUANTITY_UNITSES.enumValues.map(units => (*/}
            {/*<MenuItem value={units.name} key={units.name}>{units.name.toLowerCase()}</MenuItem>*/}
            {/*)) : null}*/}
            <MenuItem value={ingredientRange.units}
                      key={ingredientRange.units}>{ingredientRange.units.toLowerCase()}</MenuItem>
          </ShadowedSelect>
        </Grid>
      </Grid>
      <Grid item container lg={2}>
        <Grid item lg={10} container direction='column' justify='flex-end'>
          <Grid item>
            <ShadowedSelect value={ingredientRange.frequency} onChange={handleChangeFrequency}>
              {/* Disabling while feature unimplemented */}
              {/*{FREQUENCIES && FREQUENCIES.enumValues ? FREQUENCIES.enumValues.map(frequency => (*/}
              {/*<MenuItem value={frequency.name}*/}
              {/*key={frequency.name}>{upperFirst(frequency.name.toLowerCase())}</MenuItem>*/}
              {/*)) : null}*/}
              <MenuItem value={ingredientRange.frequency}
                        key={ingredientRange.frequency}>{upperFirst(ingredientRange.frequency.toLowerCase())}</MenuItem>
            </ShadowedSelect>
          </Grid>
        </Grid>
        <Grid item lg={2} container direction='column' justify='flex-end'>
          <Grid item container direction='row' justify='center'>
            <Grid item>
              <XIconImg src={XIcon} onClick={handleRemove}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default withReferenceData(IngredientRangeSelection);
