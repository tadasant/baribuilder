export enum Frequency {
  DAILY,
  MONTHLY,
  YEARLY
}

export interface Price {
  value: number;
}

export interface Cost {
  value: Price;
  frequency: Frequency;
}

export interface EnhancedProduct {
  id: string;
  cost: Cost;
  projectedRegimenCost: Cost;
  defaultQuantity: number;
  matchScore: number;
}
