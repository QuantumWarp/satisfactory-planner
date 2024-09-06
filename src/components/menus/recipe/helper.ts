import { InputType } from "../../../model/data/enums";
import { allRecipes } from "../../../resources/data.helper";

export function getRecipes(
  itemKey?: string,
  input?: InputType,
  noAlternates?: boolean,
) {
  let recipes = allRecipes;

  if (noAlternates) {
    recipes = recipes.filter((x) => !x.isAlternate);
  }

  if (itemKey) {
    if (input) {
      recipes = recipes.filter((x) => x.ingredients.find((y) => y.itemKey === itemKey));
    } else {
      recipes = recipes.filter((x) => x.products.find((y) => y.itemKey === itemKey));
    }
  }

  return recipes;
}