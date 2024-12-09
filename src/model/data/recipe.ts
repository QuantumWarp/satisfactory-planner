export interface RecipeInput {
  itemKey: string;
  amount: number;
}

export interface Recipe {
  name: string;
  producerKey: string;
  ingredients: RecipeInput[];
  products: RecipeInput[];
  duration: number;
  isAlternate: boolean;
  isExtraction: boolean;
}
