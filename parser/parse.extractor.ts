/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormType } from "../src/model/data/enums";
import { checkIcon, data, getBlobsGroup } from "./parse.data";

const extractorSuffixes = [
  "FGBuildableWaterPump",
  "FGBuildableResourceExtractor",
  "FGBuildableFrackingExtractor",
];

const classRegex = /\/[^/]*?\.(Desc.*?_.*?_C)/g;

export const parseExtractors = async () => {
  const extractorBlobs = getBlobsGroup(extractorSuffixes)

  for (const blob of extractorBlobs) {
    const key = blob.ClassName;
    const existing = data.producers.find((x) => x.key === key);
    if (existing) return key;
  
    const name = blob.mDisplayName;
    const iconPath = await checkIcon(name);
  
    const producer = {
      key,
      name: name,
      icon: iconPath,
      description: blob.mDescription,
      powerConsumption: Number(blob.mPowerConsumption)
    };
    data.producers.push(producer);

    // Create the extractor recipes
    const allowedResourceClasses = blob.mAllowedResources && [...blob.mAllowedResources.matchAll(classRegex)].map((x) => x[1]);
    const allowedForms = [...blob.mAllowedResourceForms.replace(/[()]/g, "").split(",")]
      .map((x) => x === "RF_GAS" ? FormType.Gas : (x === "RF_LIQUID" ? FormType.Liquid : FormType.Solid))
    let resources = data.items
      .filter((x) => x.isResource)
      .filter((x) => allowedForms.includes(x.form));
    if (allowedResourceClasses) {
      resources = resources.filter((x) => allowedResourceClasses.includes(x.key))
    }

    for (const resource of resources) {
      data.recipes.push({
        name: resource.name,
        producerKey: producer.key,
        ingredients: [],
        products: [{
          itemKey: resource.key,
          amount: Number(blob.mItemsPerCycle) * (resource.form !== FormType.Solid ? 0.001 : 1)
        }],
        duration: Number(blob.mExtractCycleTime),
        isAlternate: false,
        isExtraction: true
      });
    }
  }
}
