import { InputType } from "../../../model/data/enums";
import { allItems, allRecipes } from "../../../model/data.helper";

export function getRecipes(
  itemKey?: string,
  input?: InputType,
  noAlternates?: boolean,
  noFicsmas?: boolean,
) {
  let recipes = allRecipes;

  if (noAlternates) {
    recipes = recipes.filter((x) => !x.isAlternate);
  }

  if (noFicsmas) {
    const ficsmasKeys = allItems.filter((x) => x.isFicsmas).map((x) => x.key);
    recipes = recipes.filter((x) => !x.products.find((p) => ficsmasKeys.includes(p.itemKey)));
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

  return recipes.sort((a, b) => {
    if (a.isAlternate && !b.isAlternate) return 1;
    if (!a.isAlternate && b.isAlternate) return -1;

    const isInProductA = a.products.find((x) => x.itemKey === itemKey);
    const isInProductB = b.products.find((x) => x.itemKey === itemKey);

    if (isInProductA && !isInProductB) return -1;
    if (!isInProductA && isInProductB) return 1;

    return a.name.localeCompare(b.name);
  });
}