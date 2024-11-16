import { writeFile, readFile, mkdir } from "fs/promises";

const url = "https://satisfactory.wiki.gg";
const iconPages = {
  buildings: "/wiki/Category:Building_icons",
  items: "/wiki/Category:Item_icons",
  fluids: "/wiki/Category:Fluid_icons",
  milestones: "/wiki/Category:Milestone_icons",
  vehicles: "/wiki/Category:Vehicle_icons",
};
const webpageDownloadPath = "./parser/webpages/";
const iconDownloadPath = "./parser/icons/";

const downloadAll = async () => {
  const keys = Object.keys(iconPages) as (keyof typeof iconPages)[];

  const localPagePaths: { [key: string]: string[] } = {};
  await mkdir(webpageDownloadPath, { recursive: true });
  await mkdir(iconDownloadPath, { recursive: true });

  for (const key of keys) {
    const page = iconPages[key];
    const localPaths = await downloadWebpages(key, page);
    localPagePaths[key] = localPaths;
  }

  for (const key of keys) {
    const localPaths = localPagePaths[key];
    for (const path of localPaths) {
      await downloadIcons(key, path);
    }
  }
}

const downloadWebpages = async (key: string, page: string, index = 0): Promise<string[]> => {
  const filePath = webpageDownloadPath + key + index + ".html";

  const exists = await readFile(filePath).then(() => true).catch(() => false);

  if (!exists) {
    console.log(`Downloading webpage to ${filePath}...`);
    const webpageUrl = url + page;
    const result = await fetch(webpageUrl).then((res) => res.text());
    await writeFile(filePath, result);
  }

  const html = await readFile(filePath).then((res) => res.toString());

  const nextPageRegex = /<a href="([^"]*?)"[^>]*?>next page<\/a>/g;
  const nextPageMatch = nextPageRegex.exec(html);

  if (nextPageMatch) {
    const localPaths = await downloadWebpages(
      key, nextPageMatch[1].replace(/&amp;/g, '&'), index + 1
    );
    return [filePath, ...localPaths];
  }

  return [filePath];
};

const downloadIcons = async (key: string, filePath: string) => {
  const saveDir = iconDownloadPath + key + "/";
  await mkdir(saveDir, { recursive: true });

  const html = await readFile(filePath).then((res) => res.toString());

  const iconUrls = html
    .match(/\/images\/thumb(.*?)\.png/g)!
    .filter((x, index, self) => self.indexOf(x) === index)
    .map((x) => x.replace("thumb/", ""));

    
  for (const iconUrl of iconUrls) {
    const filename = iconUrl.split("/").pop();
    const filePath = saveDir + filename;
    await downloadFile(iconUrl, filePath);
  }
};

const downloadFile = async (fileUrl: string, filePath: string) => {
  const exists = await readFile(filePath).then(() => true).catch(() => false);
  if (exists) return;
  
  console.log(`Downloading ${fileUrl}...`);
  await new Promise((resolve) => setTimeout(resolve, 200));

  const buffer = await fetch(url + fileUrl).then((res) => res.arrayBuffer());
  writeFile(filePath, Buffer.from(buffer));
};

downloadAll();
