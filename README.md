# Satisfactory Planner

## Rerunning Parser

### Get Icons

- Run `npm run icons` to get the icons into the resources folder

### Get Docs.json

- Located in `F:\Program Files\Steam\steamapps\common\Satisfactory\CommunityResources\Docs\en-GB.json`
- Copy into `parser` folder
- Open the file and use `Ctrl + Shift + P` and apply the default formatter
- Replace `\r\n` with a space _without_ regex
- Replace `\"` with a `\\"` _without_ regex
- Replace `\n\s*` with a space _with_ regex
- Create `docs.ts` file with `export const docs = ``;` and _COPY_ and _PASTE_ all the content of `Docs.json`

### Create satistfactory-data.json

- Run `npm run parse` to parse the Docs.json and create a more satinitized json that can be used directly
