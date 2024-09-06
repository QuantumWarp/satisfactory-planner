import { Recipe } from "./data/recipe";

let id = 0;

export const createNode = (recipe: Recipe, multiplier = 1) => {
  id += 1;
  return {
    id: id.toString(),
    type: 'recipeNode',
    position: { x: 0, y: 0 },
    data: { recipe, multiplier }
  };
}
