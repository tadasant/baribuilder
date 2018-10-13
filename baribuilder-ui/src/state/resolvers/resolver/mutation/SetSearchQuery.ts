import {TResolverFunc} from '../../../resolvers';

interface ISetSearchQuery {
  searchQuery: string;
}

const SetSearchQueryResolver: TResolverFunc<{}, ISetSearchQuery, string> = (obj, args, context) => {
  context.cache.writeData({
    data: {
      searchQuery: args.searchQuery,
    }
  });
  return args.searchQuery;
};

export default SetSearchQueryResolver;
