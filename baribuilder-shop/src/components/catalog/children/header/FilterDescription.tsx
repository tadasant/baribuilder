import {upperFirst} from 'lodash';
import * as React from 'react';
import {SFC} from 'react';
import {ChildDataProps, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {RouteComponentProps} from 'react-router-dom';
import {compose} from 'recompose';
import {GetCatalogProducts_allClientCatalogProducts} from '../../../../typings/gql/GetCatalogProducts';
import {GetSearchQuery} from '../../../../typings/gql/GetSearchQuery';
import {SEARCH_QUERY_QUERY} from '../../queries';

interface IProps {
  filteredClientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[];
}

type QueryOutputProps = ChildDataProps<{}, GetSearchQuery>;

const FilterDescription: SFC<RouteComponentProps & QueryOutputProps & IProps> = (props) => {
  const {filteredClientCatalogProducts, data, location} = props;

  const pathnameTokens = location.pathname.split('/');
  const selectedCategory = pathnameTokens[pathnameTokens.length - 1].toUpperCase();
  const searchQuery = data.searchQuery ? data.searchQuery.value : '';
  const productCount = filteredClientCatalogProducts ? filteredClientCatalogProducts.length : undefined;

  return (
    <span>
      Showing{productCount ? ` ${productCount} ` : ' '}results in&nbsp;
      <b>{selectedCategory.split('_').map(c => upperFirst(c.toLowerCase())).join(' ')}</b>
      {searchQuery ? ` for "${searchQuery}"`: null}
    </span>
  )
};

const withData = graphql<{}, GetSearchQuery>(SEARCH_QUERY_QUERY);

const enhance = compose<RouteComponentProps & QueryOutputProps & IProps, IProps>(
  withData,
  withRouter,
);

export default enhance(FilterDescription);
