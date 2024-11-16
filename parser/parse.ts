/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFile } from "fs/promises";
import { data, getBlobs, ParseError } from "./parse.data.ts";
import { parseRecipeProducedIn } from "./parse.producer.ts";
import { parseRecipeIngredients } from "./parse.item.ts";
import { parseExtractors } from "./parse.extractor.ts";

const path = "./parser/data/data.json";

const recipeSuffix = "FGRecipe";

const parse = async () => {
  const recipeBlobs = getBlobs(recipeSuffix);

  for (const x of recipeBlobs) {
    try {
      const recipe = {
        name: x.mDisplayName.replace("Alternate: ", ""),
        producerKey: await parseRecipeProducedIn(x.mProducedIn),
        ingredients: await parseRecipeIngredients(x.mIngredients),
        products: await parseRecipeIngredients(x.mProduct),
        duration: Number(x.mManufactoringDuration),
        isAlternate: x.mDisplayName.startsWith("Alternate: "),
        isExtraction: false
      };
      data.recipes.push(recipe);
    } catch (e) {
      if (!(e instanceof ParseError)) throw e;
      const ignore = [
        "No producer",
        "Could not find producer - BP",
        "Could not find item - BP"
      ]
      if (ignore.find((x) => e.message.startsWith(x))) continue;
      console.log(e);
      console.log(x.mDisplayName)
      throw e
    }
  }

  await parseExtractors();

  await writeFile(path, JSON.stringify(data, null, 2));
}

parse();
