# Satisfactory Planner

## Get Docs.json

- Located in `F:\Program Files\Steam\steamapps\common\Satisfactory\CommunityResources\Docs\Docs.json`
- Copy into `parser` folder
- Open the file and use `Ctrl + Shift + P` and apply the default formatter
- Replace `\r\n` with a space _without_ regex
- Replace `\"` with a `\\"` _without_ regex
- Replace `\n\s*` with a space _with_ regex
- Create `docs.ts` file with `export const docs = ``;` and _COPY_ and _PASTE_ all the content of `Docs.json`
