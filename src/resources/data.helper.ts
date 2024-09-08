import { Item } from '../model/data/item';
import { Recipe } from '../model/data/recipe';
import { Producer } from '../model/data/producer';
import statisfactoryData from './satisfactory-data.json';

export const allItems: Item[] = statisfactoryData.items
  .filter((x) => !x.isFicsmas)
  .sort((a, b) => a.name.localeCompare(b.name));

export const allRecipes: Recipe[] = statisfactoryData.recipes
  .sort((a, b) => a.name.localeCompare(b.name));

export const allProducers: Producer[] = statisfactoryData.producers
  .sort((a, b) => a.name.localeCompare(b.name))