import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {ICost} from '../../client-schema-types';
import calculateCost from '../lib/product_cost';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';

/**
 * Required remote data. Reverse engineered from a query.
 *
 * query {
 *      Product(id: "${id}"){
 *          listings {
 *              price {
 *                  amount
 *              }
 *              numServings
 *          }
 *      }
 *  }
 */

interface IPrice {
  amount: number;
}

export interface IListingForProductCost {
  price: IPrice;
  numServings: number;
}

interface IDefaultQuantity {
  amount: number;
  frequency: FREQUENCY;
}

export type IProductObjForProductCost = IProductObj & {
  listings: IListingForProductCost[] | null;
  defaultUnitQuantity: IDefaultQuantity;
}

const costResolver: TLocalProductResolverFunc<IProductObjForProductCost, ICost> = (obj, _, {cache}) => {
  //// Verify required data is present
  if (!obj.listings || !obj.defaultUnitQuantity) {
    console.warn('obj listings or defaultUnitQuantity falsey');
    return null;
  }

  //// Perform transformation
  // TODO send quantity from local state (not just defaultUnitQuantity)
  return calculateCost(obj.listings, obj.defaultUnitQuantity);
};

export default costResolver;
