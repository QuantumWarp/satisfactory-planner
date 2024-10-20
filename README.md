# Satisfactory Planner

## Get Icons

- Run `npm run icons` to get the icons into the resources folder

## Get Docs.json

- Located in `F:\Program Files\Steam\steamapps\common\Satisfactory\CommunityResources\Docs\en-GB.json`
- Copy into `parser` folder
- Open the file and use `Ctrl + Shift + P` and apply the default formatter
- Replace `\r\n` with a space _without_ regex
- Replace `\"` with a `\\"` _without_ regex
- Replace `\n\s*` with a space _with_ regex
- Create `docs.ts` file with `export const docs = ``;` and _COPY_ and _PASTE_ all the content of `Docs.json`

## Create satistfactory-data.json

- Run `npm run parse` to parse the Docs.json and create a more satinitized json that can be used directly

## Todo

- Edge drop when no recipes available
- Don't allow invalid node conneciton
- Balance button (from the current node, adjust all amounts to match)
- Color rows a different color if not balanced
- Prevent invalid connections being made
- Improve look of Recipe menu
- Settings? No alternates.
- Save & Load
- Icon, title and button improvements
