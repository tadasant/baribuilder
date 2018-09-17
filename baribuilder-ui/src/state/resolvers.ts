const resolvers = {
  Query: {
    CurrentRegimen: () => ({}),
    DesiredDosages: () => ({}),
  },
  Product: {
    cost: () => ({
      value: {
        amount: 100,
      },
      frequency: 'DAILY',
    }),
    projectedRegimenCost: () => ({
      value: {
        amount: 100,
      },
      frequency: 'DAILY',
    }),
    defaultUnitQuantity: () => 1,
    matchScore: () => 100.0,
  },
  Mutation: {},
};

export default resolvers;
