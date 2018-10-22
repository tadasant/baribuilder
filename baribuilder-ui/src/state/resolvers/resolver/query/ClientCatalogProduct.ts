import {IClientCatalogProduct} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import costResolver from '../clientCatalogProduct_cost';
import costEffectivenessRatingResolver from '../clientCatalogProduct_costEffectivenessRating';
import defaultQuantityResolver from '../clientCatalogProduct_defaultQuantity';
import matchScoreResolver from '../clientCatalogProduct_matchScore';

interface IClientCatalogProductArgs {
  catalogProductId: string;
}

const ClientCatalogProduct: TResolverFunc<{}, IClientCatalogProductArgs, IClientCatalogProduct> = (obj, args, {cache}) => {
  const cost = costResolver({catalogProductId: args.catalogProductId}, {}, {cache});
  const costEffectivenessRating = costEffectivenessRatingResolver({catalogProductId: args.catalogProductId}, {}, {cache});
  const defaultQuantity = defaultQuantityResolver({catalogProductId: args.catalogProductId}, {}, {cache});
  const matchScore = matchScoreResolver({catalogProductId: args.catalogProductId}, {}, {cache});

  if (cost !== null && defaultQuantity !== null && matchScore !== null) {
    return {
      __typename: 'ClientCatalogProduct',
      catalogProductId: args.catalogProductId,
      cost,
      costEffectivenessRating,
      defaultQuantity,
      matchScore,
    }
  }

  return null;
};

export default ClientCatalogProduct;
