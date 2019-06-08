import {INGREDIENT_QUANTITY_UNITS} from '../../../typings/gql/globalTypes';

interface IIngredientPrice {
  price: number;
  units: INGREDIENT_QUANTITY_UNITS;
  source: string;
}

interface IIngredientPricesByName {
  [key: string]: IIngredientPrice;
}

export const ingredientPricesByName: IIngredientPricesByName = {
  'Vitamin A': {
    price: 0.000003692,
    units: INGREDIENT_QUANTITY_UNITS.IU,
    source: "BioTech Pharmacal A-25"
  },
  'Vitamin C': {
    price: 0.00006232,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "https://www.amazon.com/NOW-Vitamin-Sustained-Release-Tablets/dp/B0013P1GD6/ref=sr_1_6_a_it?ie=UTF8&qid=1535300243&sr=8-6&keywords=vitamin+c",
  },
  'Vitamin D2': {
    price: 0.00000468,
    units: INGREDIENT_QUANTITY_UNITS.IU,
    source: "Biotech Pharmacal D3-50",
  },
  'Vitamin D3': {
    price: 0.000004688,
    units: INGREDIENT_QUANTITY_UNITS.IU,
    source: "Biotech Pharmacal D3-50",
  },
  'Vitamin E': {
    price: 0.00037475,
    units: INGREDIENT_QUANTITY_UNITS.IU,
    source: "BioTech Pharmacal E-400-Clear",
  },
  'Vitamin K1': {
    price: 0.0001751,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "BioTech K1-1000",
  },
  'Vitamin K2': {
    price: 0.00277,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "MK-7",
  },
  'Thiamine': {
    price: 0.000665,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "Super Source Vitamin B1",
  },
  'Riboflavin': {
    price: 0.000311458,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "https://www.amazon.com/Nutricost-Vitamin-Riboflavin-400mg-Capsules/dp/B01IG5JH90/ref=sr_1_5_s_it?s=hpc&ie=UTF8&qid=1535300338&sr=1-5&keywords=vitamin%2Bb2&th=1",
  },
  'Niacin': {
    price: 0.000099583,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "https://www.amazon.com/Nutricost-Niacinamide-Vitamin-500mg-Capsules/dp/B01M9GIV8S/ref=sr_1_6_s_it?s=hpc&ie=UTF8&qid=1535300384&sr=1-6&keywords=vitamin%2Bb3&th=1",
  },
  'Vitamin B6': {
    price: 0.000434,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "https://www.amazon.com/NOW-Vitamin-B-6-100-Capsules/dp/B005P0XRK0/ref=sr_1_5_s_it?s=hpc&ie=UTF8&qid=1535300500&sr=1-5&keywords=vitamin%2Bb6&th=1",
  },
  'Folic Acid': {
    price: 0.000045625,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "https://www.amazon.com/Nutricost-Folic-Acid-Vitamin-Capsules/dp/B01IO43YO2/ref=sr_1_4_s_it?s=hpc&ie=UTF8&qid=1535300562&sr=1-4&keywords=vitamin+b9",
  },
  'Vitamin B12': {
    price: .0000452333,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "Jarrow Formulas (5000)",
  },
  'Biotin': {
    price: 0.0000199,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "Superior Source Biotin",
  },
  'Pantothenic Acid': {
    price: 0.0000988,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "https://www.amazon.com/NOW-Pantothenic-Acid-500-Capsules/dp/B0013OUQEM/ref=sr_1_4_s_it?s=hpc&ie=UTF8&qid=1535300685&sr=1-4&keywords=pantothenic+acid",
  },
  'Calcium': {
    price: 0.0004,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "Upcal D",
  },
  'Iron': {
    price: 0.085015873,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "Proferrin",
  },
  'Phosphorous': {
    price: 0.003861364,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "Multivitamin/Multimineral Supplement (centrum)",
  },
  'Iodine': {
    price: 0.000514848,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "Multivitamin/Multimineral Supplement (centrum)",
  },
  'Magnesium': {
    price: 0.000443333,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "KAL Magnesium Glycinate",
  },
  'Zinc': {
    price: 0.000852,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "Puritan's Pride Zinc",
  },
  'Selenium': {
    price: 0.004064593,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "Multivitamin/Multimineral Supplement (centrum)",
  },
  'Copper': {
    price: 0.078333333,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "https://www.amazon.com/Pure-Encapsulations-Glycinate-Hypoallergenic-Supplement/dp/B000H7Y6J2/ref=sr_1_4_s_it?s=hpc&ie=UTF8&qid=1535300754&sr=1-4&keywords=copper&th=1",
  },
  'Manganese': {
    price: 0.136161616,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "Citracal Maximum Plus",
  },
  'Chromium': {
    price: 0.001544545,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "Multivitamin/Multimineral Supplement (centrum)",
  },
  'Sodium': {
    price: 0.029955556,
    units: INGREDIENT_QUANTITY_UNITS.MG,
    source: "Citracal Maximum Plus",
  },
  'Molybdenum': {
    price: 0.001716162,
    units: INGREDIENT_QUANTITY_UNITS.MCG,
    source: "Multivitamin/Multimineral Supplement (centrum)",
  }
};