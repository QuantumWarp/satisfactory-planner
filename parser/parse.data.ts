/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFile } from "fs/promises";
import { SatisfactoryData } from "../src/model/data/satisfactory-data";
import { docs } from "./data/docs.ts";

const iconDownloadPath = "./parser/icons/";
const iconsSubfolders = ["buildings", "items", "fluids", "milestones", "vehicles"];
const rawData = JSON.parse(docs);

export const data: SatisfactoryData = {
  recipes: [],
  producers: [],
  items: [],
};

export class ParseError extends Error {
  parseError = true;
}


export const getBlobsGroup = (recipeSuffixes: string[]) => {
  return recipeSuffixes
    .map((x) => getBlobs(x))
    .reduce((a, b) => a.concat(b));
}


export const getBlobs = (recipeSuffix: string) => {
  return rawData.find((x: any) => x.NativeClass.endsWith(recipeSuffix + "'")).Classes;
}

export const checkIcon = async (friendlyName: string) => {
  const filename = friendlyName.replace(/ /g, "_");
  if (["Converter", "Quantum_Encoder", "SAM_Fluctuator"].includes(filename)) return iconDownloadPath + "buildings/Label_Sign_2m.png";

  for (const iconSubfolder of iconsSubfolders) {
    const iconPath = iconDownloadPath + iconSubfolder + "/" + filename + ".png";
    console.log(iconPath)
    const exists = await readFile(iconPath).then(() => true).catch(() => false);
    if (exists) return iconPath;
  }

  throw  new ParseError(`No icon found for ${filename}`);
}
