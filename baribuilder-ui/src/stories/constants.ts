import {GraphqlQueryControls} from 'react-apollo';
import {RouteComponentProps} from 'react-router';

export const defaultRouterProps: RouteComponentProps = {
  "match": {
    "path": "/browse",
    "url": "/browse",
    "isExact": false,
    "params": {}
  },
  "location": {
    "pathname": "/browse/all_products",
    "search": "",
    "hash": "",
    "key": "3c81rh",
    "state": "",
  },
  "history": {
    "length": 12,
    "action": "POP",
    "location": {
      "pathname": "/browse/all_products",
      "search": "",
      "hash": "",
      "key": "3c81rh",
      "state": "",
    },
    "push": () => null,
    "replace": () => null,
    "go": () => null,
    "goForward": () => null,
    "goBack": () => null,
    "block": () => () => null,
    "listen": () => () => null,
    "createHref": () => "",
  }
};

export const defaultApolloData: GraphqlQueryControls = {
  networkStatus: 200,
  loading: false,
  variables: {},
  fetchMore: () => new Promise(resolve => null),
  refetch: () => new Promise(resolve => null),
  startPolling: () => null,
  stopPolling: () => null,
  subscribeToMore: () => () => null,
  updateQuery: () => null,
};
