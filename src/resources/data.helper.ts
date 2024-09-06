import { Item } from '../model/data/item';
import { Recipe } from '../model/data/recipe';
import statisfactoryData from './satisfactory-data.json';

export const allItems: Item[] = statisfactoryData.items
  .sort((a, b) => a.name.localeCompare(b.name));

export const allRecipes: Recipe[] = statisfactoryData.recipes
  .sort((a, b) => a.name.localeCompare(b.name));
