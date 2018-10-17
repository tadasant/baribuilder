import {keyBy} from 'lodash';
import CustomTemplate, {CUSTOM_TEMPLATE_NAME} from './CustomTemplate';
import GastricBypass from './GastricBypassASMBS';

const templates = [CustomTemplate, GastricBypass];

const templatesByName = keyBy(templates, template => template.selectedTemplateName);

export const DEFAULT_TEMPLATE_NAME = Object.keys(templatesByName).find(name => name.toLowerCase().includes('bypass')) || CUSTOM_TEMPLATE_NAME;

export default templatesByName;
