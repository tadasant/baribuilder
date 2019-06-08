import {MenuItem} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import {HandleChangeTemplate} from '../GoalsScreen';
import templatesByName from '../templates/templates';
import {EmphasizedShadowedSelect} from './IngredientRangeSelection';

interface IProps {
  selectedTemplateName: string;
  onChangeTemplate: HandleChangeTemplate;
}

const TemplateSelect: SFC<IProps> = ({selectedTemplateName, onChangeTemplate}) => {
  const handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChangeTemplate(event.target.value);
  };

  return (
    <EmphasizedShadowedSelect value={selectedTemplateName} onChange={handleChange}>
      {Object.keys(templatesByName).map(name => (
        <MenuItem value={name} key={name}>
          {name}
        </MenuItem>
      ))}
    </EmphasizedShadowedSelect>
  )
};

export default TemplateSelect;
