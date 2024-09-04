export type RecipeInput = {
  name: string;
  amount: number;
}

export type Recipe = {
  name: string;
  producedIn: string[];
  ingredients: RecipeInput[];
  product: RecipeInput[];
  time: string;
}
