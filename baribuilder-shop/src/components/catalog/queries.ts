import gql from 'graphql-tag';

export const SEARCH_QUERY_QUERY = gql`
    query GetSearchQuery {
        searchQuery @client {
            value
        }
    }
`;
