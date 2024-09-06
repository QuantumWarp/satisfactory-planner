/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFile } from "fs/promises";
import { SatisfactoryData } from "../model/data/satisfactory-data";
import { docs } from "./docs.ts";

const iconDownloadPath = "./src/resources/icons/";
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

  for (const iconSubfolder of iconsSubfolders) {
    const iconPath = iconDownloadPath + iconSubfolder + "/" + filename + ".png";
    const exists = await readFile(iconPath).then(() => true).catch(() => false);
    if (exists) return iconPath;
  }

  throw new ParseError(`No icon found for ${filename}`);
}
