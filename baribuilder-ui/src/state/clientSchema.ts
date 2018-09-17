// Defines what we can query on the GraphQL client store

export const clientSchema = `
    enum Frequency {
        DAILY
        MONTHLY
        YEARLY
    }
    
    type Cost {
        value: Price!
        frequency: Frequency!
    }
    
    type Product {
        cost: Cost!
        projectedRegimenCost: Cost!
        defaultUnitQuantity: Int!
        matchScore: Float!
    }
    
    type Query {
        allProducts
        Product
    }
`;
