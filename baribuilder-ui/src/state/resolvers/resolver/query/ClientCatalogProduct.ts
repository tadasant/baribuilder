import {IClientCatalogProduct} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import costResolver from '../clientCatalogProduct_cost';
import matchScoreResolver from '../clientCatalogProduct_matchScore';
import projectedRegimenCostResolver from '../clientCatalogProduct_projectedRegimenCost';
import quantityResolver from '../clientCatalogProduct_quantity';

interface IClientCatalogProductArgs {
  catalogProductId: string;
}

const ClientCatalogProduct: TResolverFunc<{}, IClientCatalogProductArgs, IClientCatalogProduct> = (obj, args, {cache}) => {
  const cost = costResolver({catalogProductId: args.catalogProductId}, {}, {cache});
  const projectedRegimenCost = projectedRegimenCostResolver({catalogProductId: args.catalogProductId}, {}, {cache});
  const quantity = quantityResolver({catalogProductId: args.catalogProductId}, {}, {cache});
  const matchScore = matchScoreResolver({catalogProductId: args.catalogProductId}, {}, {cache});

  if (cost !== null && quantity !== null && matchScore !== null) {
    return {
      __typename: 'ClientCatalogProduct',
      catalogProductId: args.catalogProductId,
      cost,
      projectedRegimenCost,
      quantity,
      matchScore,
    }
  }

  return null;
};

export default ClientCatalogProduct;
