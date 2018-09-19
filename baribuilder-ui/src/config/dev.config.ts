import commonConfig from './common.config';
import {IConfig} from './configTyping';

const config: IConfig = {
  ...commonConfig,
  fbPixel: {
    key: '1096420780524071',
    settings: {
      autoConfig: true,
      debug: true,
    }
  },
};

export default config;