import {IConfig} from './configTyping';
import devConfig from './dev.config';
import prodConfig from './prod.config';

export const isProduction = window.location.host === 'baribuilder.com' || window.location.host === 'shop.baribuilder.com';
const config: IConfig = isProduction ? prodConfig : devConfig;
export default config;
