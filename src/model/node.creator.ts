import { ChooseNodeProps } from "../components/nodes/ChooseNode";
import { OtherNodeProps } from "../components/nodes/OtherNode";
import { RecipeNodeProps } from "../components/nodes/RecipeNode";
import { InputType } from "./data/enums";
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

export const createOtherNode = (data: OtherNodeProps) => {
  id += 1;
  return {
    id: id.toString(),
    type: 'otherNode',
    position: { x: 0, y: 0 },
    data
  };
}


export const createChooseNode = (data: ChooseNodeProps, position: { x: number, y: number }) => {
  id += 1;
  return {
    id: id.toString(),
    type: 'chooseNode',
    position,
    data
  };
}

export const getInfoFromHandle = (handleKey: string, recipeNodeProps: RecipeNodeProps) => {
  const input = handleKey.split('-')[0] === "ingredient" ? InputType.Ingredient : InputType.Product;
  const itemKey = handleKey.split('-')[1];
  const baseAmount = input === InputType.Ingredient
    ? recipeNodeProps.recipe.ingredients.find(x => x.itemKey === itemKey)!.amount
    : recipeNodeProps.recipe.products.find(x => x.itemKey === itemKey)!.amount;
  const baseAmountPerMin = toPerMin(baseAmount, recipeNodeProps.recipe.duration);
  return {
    itemKey,
    input,
    amountPerMin: baseAmountPerMin * recipeNodeProps.multiplier
  };
}


export const toPerMin = (amount: number, duration: number) => {
  return (60 / duration) * amount
}