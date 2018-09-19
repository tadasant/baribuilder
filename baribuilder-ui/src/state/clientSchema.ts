// Defines what we can query on the GraphQL client store

// TODO this typeDefs feature is broken. It is only used for
// introspection, not validation, and the introspection breaks
// for weird reasons: https://github.com/apollographql/apollo-client-devtools/issues/132

// TODO couldn't get schema stitching to work to store product in the same remote + client setup
// Need to make a GitHub issue w/ reproducible
// Hunch is: Graphcool's resolvers aren't what I think they are, and my client side stuff isn't matching up
// But that might not be completely breaking
// https://github.com/apollographql/apollo-client-devtools/issues/132
// There's some sort of problem with my stitching.
// This example works: https://codesandbox.io/s/32w9xwk9n5
// Mine is the same


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
        id: ID!
        cost: Cost!
        projectedRegimenCost: Cost!
        defaultUnitQuantity: Quantity!
        matchScore: Float!
    }

    type Query {
        localProducts
    }
`;
