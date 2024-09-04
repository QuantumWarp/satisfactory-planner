import { writeFile, readFile } from "fs/promises";

const url = "https://satisfactory.wiki.gg";
const iconsPath = "/wiki/Category:Item_icons";
const webpageDownload = "./src/parser/webpage.html";
const savePath = "./src/resources/icons/";

const downloadIcons = async () => {
  let html = await readFile(webpageDownload)
    .then((res) => res.toString())
    .catch(() => null);
  
  if (!html) {
    console.log("Downloading webpage...");
    const result = await fetch(url + iconsPath).then((res) => res.text());
    await writeFile(webpageDownload, result);
    html = result;
  }

  const iconPaths = html
    .match(/\/images\/thumb(.*?)\.png/g)!
    .filter((x, index, self) => self.indexOf(x) === index)
    .map((x) => x.replace("thumb/", ""));

  for (const iconPath of iconPaths) {
    const filename = iconPath.split("/").pop();
    const path = savePath + filename;
    const exists = await readFile(path).then(() => true).catch(() => false);
    if (exists) continue;

    console.log(`Downloading ${filename}...`);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const buffer = await fetch(url + iconPath).then((res) => res.arrayBuffer());
    writeFile(path, Buffer.from(buffer));
  }
}

downloadIcons();
