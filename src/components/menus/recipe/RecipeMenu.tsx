import { Box, Menu } from "@mui/material";
import { Recipe } from "../../../model/data/recipe";
import { RecipeSelection } from "./RecipeSelection";
import { ItemSelection } from "./ItemSelection";
import { useState } from "react";
import { Item } from "../../../model/data/item";
import { getRecipes } from "./helper";
import { InputType } from "../../../model/data/enums";

type RecipeMenuProps = {
  itemKey?: string;
  input?: InputType;
  noAlternates?: boolean;
  anchorEl: HTMLElement | null;
  onSelect: (recipe: Recipe) => void;
  onClose: () => void;
}

export function RecipeMenu({ 
  itemKey,
  input = InputType.Both,
  noAlternates = false,
  anchorEl,
  onSelect,
  onClose
}: RecipeMenuProps) {
  const [selectedItemKey, setSelectedItemKey] = useState(itemKey);

  const selectItem = (item: Item) => {
    const recipes = getRecipes(item.key, input, noAlternates);
    if (recipes.length === 1) {
      onSelect(recipes[0]);
      onClose();
    } else {
      setSelectedItemKey(item.key);
    }
  }

  return (
    <Menu
      sx={{ mt: 1, maxHeight: 600 }}
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
      transitionDuration={{
        enter: 225,
        exit: 100,
      }}
      onClose={() => {
        setTimeout(() => setSelectedItemKey(undefined), 200);
        onClose();
      }}
    >
      <Box>
        {!selectedItemKey && <ItemSelection
          onSelect={selectItem}
        />}

        {selectedItemKey && <RecipeSelection
          itemKey={selectedItemKey}
          input={input}
          noAlternates={noAlternates}
          onSelect={onSelect}
        />}
      </Box>
    </Menu>
  )
}