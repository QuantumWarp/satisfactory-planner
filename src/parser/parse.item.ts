/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormType } from "../model/data/enums";
import { RecipeInput } from "../model/data/recipe";
import { checkIcon, data, getBlobsGroup, ParseError } from "./parse.data";

const itemSuffixes = [
  "FGItemDescriptor",
  "FGResourceDescriptor",
  "FGItemDescriptorBiomass",
  "FGItemDescriptorNuclearFuel",
  "FGAmmoTypeProjectile",
  "FGAmmoTypeInstantHit",
  "FGAmmoTypeSpreadshot",
  "FGPowerShardDescriptor",
  "FGItemDescriptorPowerBoosterFuel"
];

const classRegex = /\/[^/]*?_.*?\.(.*?_.*?_C)'",Amount=(\d*)/g;

export const parseRecipeIngredients = async (ingredients: string) => {
  const matches = ingredients.matchAll(classRegex);

  const results: RecipeInput[] = [];
  for (const match of matches) {
    const ingredientClass = match[1];
    const item = await parseIngredient(ingredientClass);
    const amount = Number(match[2]);
    results.push({
      itemKey: item.key,
      amount: amount * (item.form !== FormType.Solid ? 0.001 : 1)
    });
  }

  return results;
}

const parseIngredient = async (ingredientClass: string) => {
  const blob = await findFromClass(ingredientClass);

  const key = blob.ClassName;
  const existing = data.items.find((x) => x.key === key);
  if (existing) return existing;

  const name = blob.mDisplayName;
  const iconPath = await checkIcon(name);

  const item = {
    key,
    name: name,
    icon: iconPath,
    description: blob.mDescription,
    form: blob.mForm === "RF_GAS" ? FormType.Gas : (blob.mForm === "RF_LIQUID" ? FormType.Liquid : FormType.Solid),
    isSinkable: blob.mResourceSinkPoints !== "0",
    isResource: blob.mSmallIcon.includes("/Game/FactoryGame/Resource/RawResources")
      && !blob.mDisplayName.includes("Packaged"),
    isAmmo: blob.mWeaponDamageMultiplier !== undefined,
    isFicsmas: blob.mSmallIcon.includes("/Game/FactoryGame/Events/Christmas")
  };
  data.items.push(item);

  return item;
}

// Should only find a single entry since each recipe can only have one manufacturer
const findFromClass = async (buildingClass: string) => {
  const buildingBlobs = getBlobsGroup(itemSuffixes);

  const matchedBlob = buildingBlobs.find((x: any) => x.ClassName === buildingClass);
  if (matchedBlob) return matchedBlob;

  throw new ParseError(`Could not find item - ${buildingClass}`);
}
