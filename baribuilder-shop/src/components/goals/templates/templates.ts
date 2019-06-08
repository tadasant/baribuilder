import {keyBy} from 'lodash';
import CustomTemplate, {CUSTOM_TEMPLATE_NAME} from './CustomTemplate';
import DuodenalSwitch from './DuodenalSwitchASMBS';
import GastricBypass from './GastricBypassASMBS';
import GastricSleeve from './GastricSleeveASMBS';

const templates = [CustomTemplate, GastricSleeve, GastricBypass, DuodenalSwitch];

const templatesByName = keyBy(templates, template => template.selectedTemplateName);

export const DEFAULT_TEMPLATE_NAME = Object.keys(templatesByName).find(name => name.toLowerCase().includes('bypass')) || CUSTOM_TEMPLATE_NAME;

export default templatesByName;
