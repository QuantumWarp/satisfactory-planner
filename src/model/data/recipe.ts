export type RecipeInput = {
  itemKey: string;
  amount: number;
}

export type Recipe = {
  name: string;
  producerKey: string;
  ingredients: RecipeInput[];
  products: RecipeInput[];
  duration: number;
  isAlternate: boolean;
  isExtraction: boolean;
}
