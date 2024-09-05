export type RecipeInput = {
  itemKey: string;
  amount: number;
}

export type Recipe = {
  name: string;
  producerKey: string;
  ingredients: RecipeInput[];
  product: RecipeInput[];
  time: number;
}
