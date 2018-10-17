import {MenuItem} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import templatesByName from '../templates/templates';
import {EmphasizedShadowedSelect} from './IngredientRangeSelection';

interface IProps {
  replaceGoalsState: () => void; // correct type
}

const defaultTemplate = Object.keys(templatesByName).find(name => name.toLowerCase().includes('bypass'));

const TemplateSelect: SFC<IProps> = ({replaceGoalsState}) => {
  const handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    // replaceGoalsState(ingredientRange.ingredientTypeName, 'ingredientTypeName', event.target.value);
  };

  return (
    <EmphasizedShadowedSelect value={defaultTemplate} onChange={handleChange}>
      {Object.keys(templatesByName).map(templateName => (
        <MenuItem value={templateName} key={templateName}>
          {templateName}
        </MenuItem>
      ))}
    </EmphasizedShadowedSelect>
  )
};

export default TemplateSelect;
