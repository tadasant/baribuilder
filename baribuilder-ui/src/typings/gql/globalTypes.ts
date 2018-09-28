/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BRAND {
  ADVANCE_PHARMACEUTICAL = "ADVANCE_PHARMACEUTICAL",
  BARIATRIC_ADVANTAGE = "BARIATRIC_ADVANTAGE",
  BARIATRIC_FUSION = "BARIATRIC_FUSION",
  BIOTECH = "BIOTECH",
  CALTRATE = "CALTRATE",
  CELEBRATE = "CELEBRATE",
  CENTRUM = "CENTRUM",
  CITRACAL = "CITRACAL",
  COUNTRY_LIFE = "COUNTRY_LIFE",
  EQUATE = "EQUATE",
  HEALTH_AS_IT_OUGHT_TO_BE = "HEALTH_AS_IT_OUGHT_TO_BE",
  JAMIESON = "JAMIESON",
  JARROW = "JARROW",
  KAL = "KAL",
  KIRKLAND = "KIRKLAND",
  NATURES_BOUNTY = "NATURES_BOUNTY",
  NATURES_PLUS = "NATURES_PLUS",
  NATURES_WAY = "NATURES_WAY",
  NATURE_MADE = "NATURE_MADE",
  NIVAGEN = "NIVAGEN",
  NOW_FOODS = "NOW_FOODS",
  OPTISOURCE = "OPTISOURCE",
  PROFERRIN = "PROFERRIN",
  PURE_ENCAPSULATIONS = "PURE_ENCAPSULATIONS",
  PURITANS_PRIDE = "PURITANS_PRIDE",
  RUGBY = "RUGBY",
  SLICE_OF_LIFE = "SLICE_OF_LIFE",
  SMARTYPANTS = "SMARTYPANTS",
  SOURCE_NATURALS = "SOURCE_NATURALS",
  SPRING_VALLEY = "SPRING_VALLEY",
  SUPERIOR_SOURCE = "SUPERIOR_SOURCE",
  UPCAL_D = "UPCAL_D",
  VITA_G = "VITA_G",
  WONDER_LABORATORIES = "WONDER_LABORATORIES",
}

export enum CATEGORY {
  CALCIUM = "CALCIUM",
  CHROMIUM = "CHROMIUM",
  COMPLEX = "COMPLEX",
  COPPER = "COPPER",
  IODINE = "IODINE",
  IRON = "IRON",
  MAGNESIUM = "MAGNESIUM",
  MANGANESE = "MANGANESE",
  MOLYBDENUM = "MOLYBDENUM",
  MULTIVITAMIN = "MULTIVITAMIN",
  PHOSPHOROUS = "PHOSPHOROUS",
  SELENIUM = "SELENIUM",
  SODIUM = "SODIUM",
  VITAMIN_A = "VITAMIN_A",
  VITAMIN_B1 = "VITAMIN_B1",
  VITAMIN_B12 = "VITAMIN_B12",
  VITAMIN_B2 = "VITAMIN_B2",
  VITAMIN_B3 = "VITAMIN_B3",
  VITAMIN_B5 = "VITAMIN_B5",
  VITAMIN_B6 = "VITAMIN_B6",
  VITAMIN_B7 = "VITAMIN_B7",
  VITAMIN_B9 = "VITAMIN_B9",
  VITAMIN_C = "VITAMIN_C",
  VITAMIN_D2 = "VITAMIN_D2",
  VITAMIN_D3 = "VITAMIN_D3",
  VITAMIN_E = "VITAMIN_E",
  VITAMIN_K1 = "VITAMIN_K1",
  VITAMIN_K2 = "VITAMIN_K2",
  ZINC = "ZINC",
}

export enum FREQUENCY {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
}

export enum INGREDIENT_QUANTITY_UNITS {
  G = "G",
  IU = "IU",
  MCG = "MCG",
  MG = "MG",
}

export enum PRODUCT_QUANTITY_UNITS {
  SERVINGS = "SERVINGS",
}

export enum SERVING_SIZE_UNITS {
  CAPLET = "CAPLET",
  CAPSULE = "CAPSULE",
  CHEW = "CHEW",
  GRAM = "GRAM",
  GUMMY = "GUMMY",
  LOZENGE = "LOZENGE",
  SLICE = "SLICE",
  STICK_PACK = "STICK_PACK",
  TABLET = "TABLET",
}

export interface DesiredIngredientsInput {
  ingredientRanges: IngredientRangeInput[];
}

export interface IngredientRangeInput {
  ingredientTypeName: string;
  minimumAmount?: number | null;
  maximumAmount?: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface RegimenProductQuantityInput {
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
