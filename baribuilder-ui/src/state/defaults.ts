import {EnhancedProduct} from '../typings/model';

export interface IApolloStateShape {
  enhancedProducts: EnhancedProduct[];
}

const defaults: IApolloStateShape = {
  enhancedProducts: []
};

export default defaults;
