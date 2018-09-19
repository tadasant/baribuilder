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

export interface IPrice {
  amount: number
}

export interface ICost {
  value: IPrice;
  frequency: Frequency;
}

export interface IQuantity {
  amount: number;
  frequency: Frequency;
}
