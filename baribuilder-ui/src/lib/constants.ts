// From https://www.fda.gov/Food/GuidanceRegulation/GuidanceDocumentsRegulatoryInformation/LabelingNutrition/ucm513734.htm#collapseOne
// Scroll to "General order for listing..."

const ingredientTypeNameOrder = [
  'Vitamin A',
  'Vitamin C',
  'Vitamin D3',
  'Vitamin E',
  'Vitamin K1',
  'Thiamine',
  'Riboflavin',
  'Niacin',
  'Vitamin B6',
  'Folic Acid',
  'Vitamin B12',
  'Biotin',
  'Pantothenic Acid',
  'Choline',
  'Calcium',
  'Iron',
  'Phosphorous',
  'Iodine',
  'Magnesium',
  'Zinc',
  'Selenium',
  'Copper',
  'Manganese',
  'Chromium',
  'Molybdenum',
  'Chloride',
  'Sodium',
  'Potassium',
  'Fluoride',
  'Vitamin K2',
  'Vitamin D2',
];

export const compareIngredientTypeNames = (name1: string, name2: string) => {
  const index1 = ingredientTypeNameOrder.findIndex(n => n === name1);
  const index2 = ingredientTypeNameOrder.findIndex(n => n === name2);
  if (index1 === -1 && index2 === -1) {
    return 0;
  }
  if (index1 === -1) {
    return 1;
  }
  if (index2 === -1) {
    return -1;
  }
  return index1 - index2;
};
