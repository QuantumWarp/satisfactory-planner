/* eslint-disable @typescript-eslint/no-explicit-any */

import { writeFile } from "fs/promises";
import { Recipe } from "../model/data/recipe.ts";
import { docs } from "./docs.ts";
import { SatisfactoryData } from "../model/data/satisfactory-data.ts";

const path = "./src/resources/satisfactory-data.json";
const recipeSuffix = "FGRecipe'";
const recipeItemRegex = /\(ItemClass=.*?(Desc.*?)"',Amount=(.*?)\)/g;

const parse = async () => {
  const rawData = JSON.parse(docs);
  const recipeBlobs = rawData.find((x: any) => x.NativeClass.endsWith(recipeSuffix)).Classes;

  const recipes: Recipe[] = recipeBlobs.map((x: any) => ({
    name: x.mDisplayName,
    producedIn: parseProducedIn(x.mProducedIn),
    ingredients: parseIngredients(x.mIngredients),
    product: parseIngredients(x.mProduct),
    time: Number(x.mManufactoringDuration)
  }));

  const data: SatisfactoryData = {
    recipes: recipes,
    items: []
  };

  writeFile(path, JSON.stringify(data));
}

const parseProducedIn = (producedIn: string) => {
  const splits = producedIn.split(",");
  return splits.map((x) => x.split("/").pop()?.replace(/[")]/g, ""));
}

const parseIngredients = (ingredients: string) => {
  return [...ingredients.matchAll(recipeItemRegex)].map((x) => ({
    name: x[1],
    amount: Number(x[2])
  }));
}

parse();
