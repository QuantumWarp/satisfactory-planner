/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkIcon, data, getBlobsGroup, ParseError } from "./parse.data";

const buildingSuffixes = [
  "FGBuildableManufacturer",
  "FGBuildableManufacturerVariablePower"
];

const classRegex = /\/[^/]*?\.(.*?_.*?_C)/g;

export const parseRecipeProducedIn = async (producedIn: string) => {
  const classes = [...producedIn.matchAll(classRegex)].map((x) => x[1]);
  if (classes.length === 0) {
    throw new ParseError(`No producer`);
  }

  const blob = await findFromClass(classes);

  const key = blob.ClassName;
  const existing = data.producers.find((x) => x.key === key);
  if (existing) return key;

  const name = blob.mDisplayName;
  const iconPath = await checkIcon(name);

  data.producers.push({
    key,
    name: name,
    icon: iconPath,
    description: blob.mDescription,
    powerConsumption: Number(blob.mPowerConsumption)
  });

  return key;
}

// Should only find a single entry since each recipe can only have one manufacturer
const findFromClass = async (buildingClasses: string[]) => {
  const buildingBlobs = getBlobsGroup(buildingSuffixes);

  for (const buildingClass of buildingClasses) {
    const matchedBlob = buildingBlobs.find((x: any) => x.ClassName === buildingClass);
    if (matchedBlob) return matchedBlob;
  }

  throw new ParseError(`Could not find producer - ${buildingClasses}`);
}
