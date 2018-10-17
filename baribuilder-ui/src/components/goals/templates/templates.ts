import CustomTemplate from './CustomTemplate';
import GastricBypass from './GastricBypassASMBS';

const CUSTOM_TEMPLATE_NAME = 'Custom...';

const templatesByName = {
  'Gastric Bypass - ASMBS': GastricBypass,
  [CUSTOM_TEMPLATE_NAME]: CustomTemplate,
};

export const defaultTemplateName = Object.keys(templatesByName).find(name => name.toLowerCase().includes('bypass')) || CUSTOM_TEMPLATE_NAME;

export default templatesByName;
