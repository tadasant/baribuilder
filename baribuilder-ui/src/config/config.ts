import {IConfig} from './configTyping';
import devConfig from './dev.config';
import prodConfig from './prod.config';

const isProduction = window.location.host === 'baribuilder.com';
const config: IConfig = isProduction ? prodConfig : devConfig;
export default config;
