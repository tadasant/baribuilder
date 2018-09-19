// Defines what we can query on the GraphQL client store

// TODO this typeDefs feature is broken. It is only used for
// introspection, not validation, and the introspection breaks
// for weird reasons: https://github.com/apollographql/apollo-client-devtools/issues/132

// Don't forget to include __typename in GraphiQL: https://github.com/apollographql/apollo-link-state/issues/239

// apollo-link-state docs: https://www.apollographql.com/docs/link/links/state.html
// local state docs: https://www.apollographql.com/docs/react/essentials/local-state.html
export const typeDefs = `
    type Cost {
        value: Price!
        frequency: Frequency!
    }
    
    type Quantity {
        amount: Int!
        frequency: Frequency!
    }

    extends type Product {
        cost: Cost!
        projectedRegimenCost: Cost!
        defaultUnitQuantity: Quantity!
        matchScore: Float!
    }

    type Query {
        localProducts
    }
`;
