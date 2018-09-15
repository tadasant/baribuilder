import commonConfig from './common.config';
import {IConfig} from './configTyping';

const config: IConfig = {
  ...commonConfig,
  fbPixel: {
    key: '521388551638106',
    settings: {
      autoConfig: true,
      debug: false,
    }
  },
};

export default config;