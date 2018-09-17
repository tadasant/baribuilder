// Types of what is effectively the client-side database

interface IRegimenProduct {
  id: string;
  quantity: number;
  units: string;
}

interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

export interface IApolloStateShape {
  currentRegimen: IRegimen;
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [],
  },
  // desiredDosages: {
  //   __typename: 'DesiredDosages',
  //   ingredients: [],
  // }
};

export default defaults;
