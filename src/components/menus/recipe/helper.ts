import { InputType } from "../../../model/data/enums";
import { allRecipes } from "../../../model/data.helper";

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
    if (input === InputType.Product) {
      recipes = recipes.filter((x) => x.products.find((y) => y.itemKey === itemKey));
    } else if (input === InputType.Ingredient) {
      recipes = recipes.filter((x) => x.ingredients.find((y) => y.itemKey === itemKey));
    } else if (input === InputType.Both) {
      recipes = recipes.filter((x) =>
        x.ingredients.find((y) => y.itemKey === itemKey) ||
        x.products.find((y) => y.itemKey === itemKey)
      );
    }
  }

  return recipes;
}