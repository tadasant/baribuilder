interface IRegimenProduct {
  id: string;
  quantity: number;
  units: string;
}

export interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

export type Frequency = 'DAILY' | 'MONTHLY' | 'YEARLY';

interface IPrice {
  amount: number
}

interface ICost {
  value: IPrice;
  frequency: Frequency;
}

export interface IProductLocal {
  id: string;
  cost?: ICost;
  projectedRegimenCost?: ICost;
  defaultUnitQuantity?: IQuantity;
  matchScore?: number;
}

export interface IQuantity {
  amount: number;
  frequency: Frequency;
}
