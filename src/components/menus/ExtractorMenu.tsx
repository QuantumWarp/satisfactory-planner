import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { allItems } from "../../model/data.helper";
import { Recipe } from "../../model/data/recipe";
import { getRecipes } from "./recipe/helper";
import { InputType } from "../../model/data/enums";

type ExtractorMenuProps = {
  anchorEl: HTMLElement | null;
  onSelect: (recipe: Recipe) => void;
  onClose: () => void;
}

export function ExtractorMenu({
  anchorEl,
  onSelect,
  onClose
}: ExtractorMenuProps) {
  const items = allItems.filter((x) => x.isResource);

  return (
    <Menu
      sx={{ mt: 1 }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={onClose}
    >
      {items.map((item) => {
        const recipes = getRecipes(item.key, InputType.Product)
          .filter((x) => x.isExtraction);
        const recipe = recipes.find((x) => !x.name.includes("Mk2") && !x.name.includes("Mk3"))!;
        return (
          <MenuItem
            key={item.key} 
            sx={{ width: 200 }}
            onClick={() => { onSelect(recipe); onClose(); } }
          >
            <ListItemIcon>
              <img src={item.icon} height={40} />
            </ListItemIcon>
            <ListItemText sx={{ ml: 2}}>
              {item.name}
            </ListItemText>
          </MenuItem>
        )
      })}
    </Menu>
  )
}