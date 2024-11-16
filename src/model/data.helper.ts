import { Item } from './data/item';
import { Recipe } from './data/recipe';
import { Producer } from './data/producer';
import statisfactoryData from '../data.json';

export const allItems: Item[] = statisfactoryData.items
  .filter((x) => !x.isFicsmas)
  .sort((a, b) => a.name.localeCompare(b.name));

export const allRecipes: Recipe[] = statisfactoryData.recipes
  .sort((a, b) => a.name.localeCompare(b.name));

export const allProducers: Producer[] = statisfactoryData.producers
  .sort((a, b) => a.name.localeCompare(b.name))