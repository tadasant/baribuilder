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

type Frequency = 'DAILY' | 'MONTHLY' | 'YEARLY';

interface IPrice {
  amount: number
}

interface ICost {
  value: IPrice;
  frequency: Frequency;
}

export interface IProductLocal {
  id: string;
  cost: ICost;
  projectedRegimenCost: ICost;
  defaultUnitQuantity: number;
  matchScore: number;
}

export interface IApolloStateShape {
  currentRegimen: IRegimen;
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'CurrentRegimen',
    products: [],
  },
  // desiredDosages: {
  //   __typename: 'DesiredDosages',
  //   ingredients: [],
  // }
};

export default defaults;
