import {MenuItem} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import {HandleChangeTemplate} from '../GoalsScreen';
import templatesByName from '../templates/templates';
import {EmphasizedShadowedSelect} from './IngredientRangeSelection';

interface IProps {
  templateName: string;
  onChangeTemplate: HandleChangeTemplate; // correct type
}

const TemplateSelect: SFC<IProps> = ({templateName, onChangeTemplate}) => {
  const handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    onChangeTemplate(event.target.value);
  };

  return (
    <EmphasizedShadowedSelect value={templateName} onChange={handleChange}>
      {Object.keys(templatesByName).map(name => (
        <MenuItem value={name} key={name}>
          {name}
        </MenuItem>
      ))}
    </EmphasizedShadowedSelect>
  )
};

export default TemplateSelect;
