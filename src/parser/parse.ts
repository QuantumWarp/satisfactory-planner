/* eslint-disable @typescript-eslint/no-explicit-any */

import { writeFile, readFile } from "fs/promises";
import { docs } from "./docs.ts";
import { SatisfactoryData } from "../model/data/satisfactory-data.ts";

const path = "./src/resources/satisfactory-data.json";
const iconDownloadPath = "./src/resources/icons/";
const recipeSuffix = "FGRecipe'";
const recipeItemRegex = /\(ItemClass=.*?Desc_.*?\.Desc_(.*?)_C"',Amount=(.*?)\)/g;

const data: SatisfactoryData = {
  items: [],
  producers: [],
  recipes: [],
};

const parse = async () => {
  const rawData = JSON.parse(docs);
  const recipeBlobs = rawData.find((x: any) => x.NativeClass.endsWith(recipeSuffix)).Classes;

  for (const x of recipeBlobs) {
    try {
      const recipe = {
        name: x.mDisplayName,
        producerKey: await parseProducedIn(x.mProducedIn),
        ingredients: await parseIngredients(x.mIngredients),
        product: await parseIngredients(x.mProduct),
        time: Number(x.mManufactoringDuration)
      };
      data.recipes.push(recipe);
    } catch (e) {
      // console.log(e);
    }
  }

  await writeFile(path, JSON.stringify(data, null, 2));
}

const parseProducedIn = async (producedIn: string) => {
  const splits = producedIn.split(",");
  const keys: string[] = splits
    .map((x) => x.split("/").pop()?.replace(/[")]/g, ""))
    .filter((x) => Boolean(x)) as string[];
  if (!keys.length) throw new Error(`No producer`);
  if (!keys[0].includes("Build")) throw new Error(`Unneeded producer`);

  const formatted = keys[0]
    .replace(/Build_(.*?).Build_(.*?)_C/g, "$2")
    .replace("Mk1", "")
    .replace(/(?!^)([^\s])([A-Z])/g, "$1 $2")

  const iconFilename = formatted.replace(/ /g, "_");
  const iconPath = await checkIcon(iconFilename);

  const key = formatted.replace(/ /g, "-").toLowerCase();
  if (!data.producers.find((x) => x.key === key)) {
    data.producers.push({ key, name: formatted, icon: iconPath });
  }

  return key;
}

const parseIngredients = async (ingredients: string) => {
  return Promise.all([...ingredients.matchAll(recipeItemRegex)].map(async (x) => ({
    itemKey: await getItemKey(x[1]),
    amount: Number(x[2])
  })));
}

const getItemKey = async (name: string) => {
  const formatted = name
    .replace(/_/g, " ")
    .replace(/Ore(.*)/g, "$1Ore")
    .replace(/(?!^)([^\s])([A-Z])/g, "$1 $2")

  const iconFilename = formatted.replace(/ /g, "_");
  const iconPath = await checkIcon(iconFilename);

  const key = formatted.replace(/ /g, "-").toLowerCase();
  if (!data.items.find((x) => x.key === key)) {
    data.items.push({ key, name: formatted, icon: iconPath });
  }

  return key;
};

const checkIcon = async (filename: string) => {
  const iconsSubfolders = ["buildings", "items", "fluids", "milestones", "vehicles"];

  for (const iconSubfolder of iconsSubfolders) {
    const iconPath = iconDownloadPath + iconSubfolder + "/" + filename + ".png";
    const exists = await readFile(iconPath).then(() => true).catch(() => false);
    if (exists) return iconPath;
  }

  throw new Error(`No icon found for ${filename}`);
}

parse();
