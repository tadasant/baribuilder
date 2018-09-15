import {InitializeOptions} from 'react-ga';

// react-facebook-pixel is missing typings; rolling own as needed
interface IPixelSettings {
  autoConfig: boolean;
  debug: boolean
}

interface IGAConfig {
  key: String;
  settings: InitializeOptions;
}

interface IPixelConfig {
  key: String;
  settings: IPixelSettings;
}

export interface IConfig {
  graphqlEndpoint: String;
  fbPixel: IPixelConfig;
  ga: IGAConfig;
}
