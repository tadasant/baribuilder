import {ISearchQuery} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';

interface ISetSearchQueryArgs {
  searchQuery: string;
}

const SetSearchQueryResolver: TResolverFunc<{}, ISetSearchQueryArgs, ISearchQuery> = (obj, args, context) => {
  context.cache.writeData({
    data: {
      searchQuery: {
        __typename: 'SearchQuery',
        value: args.searchQuery,
      }
    }
  });
  return {
    __typename: 'SearchQuery',
    value: args.searchQuery,
  };
};

export default SetSearchQueryResolver;
