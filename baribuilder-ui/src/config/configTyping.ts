import {InitializeOptions} from 'react-ga';

// react-facebook-pixel is missing typings; rolling own as needed
interface IPixelSettings {
  autoConfig: boolean;
  debug: boolean
}

interface IGAConfig {
  key: string;
  settings: InitializeOptions;
}

interface IPixelConfig {
  key: string;
  settings: IPixelSettings;
}

export interface IConfig {
  graphqlEndpoint: string;
  fbPixel: IPixelConfig;
  ga: IGAConfig;
}
