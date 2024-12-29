import { Box, Menu } from "@mui/material";
import { Recipe } from "../../../model/data/recipe";
import { RecipeSelection } from "./RecipeSelection";
import { ItemSelection } from "./ItemSelection";
import { useState } from "react";
import { Item } from "../../../model/data/item";
import { getRecipes } from "./helper";
import { InputType } from "../../../model/data/enums";
import { useFactory } from "../../context/FactoryUse";
import { allItems } from "../../../model/data.helper";

type RecipeMenuProps = {
  itemKey?: string;
  input?: InputType;
  anchorEl: HTMLElement | null;
  onSelect: (recipe: Recipe) => void;
  onClose: (cancelled?: boolean) => void;
}

export function RecipeMenu({
  itemKey,
  input = InputType.Both,
  anchorEl,
  onSelect,
  onClose
}: RecipeMenuProps) {
  const { alternates, ficsmas: ficsmasSetting } = useFactory();
  const [selectedItemKey, setSelectedItemKey] = useState(itemKey);

  const item = allItems.find((x) => x.key === itemKey);
  const ficsmas = item?.isFicsmas || ficsmasSetting;

  const selectItem = (item: Item) => {
    const recipes = getRecipes(item.key, input, !alternates, !ficsmas);
    if (recipes.length === 1) {
      onSelect(recipes[0]);
      closeMenu();
    } else {
      setSelectedItemKey(item.key);
    }
  };

  const closeMenu = (cancelled?: boolean) => {
    setTimeout(() => setSelectedItemKey(undefined), 200);
    onClose(cancelled);
  };

  return (
    <Menu
      sx={{ mt: 1 }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      transitionDuration={{ enter: 225, exit: 100 }}
      onClose={() => closeMenu(true)}
    >
      <Box>
        {!selectedItemKey && <ItemSelection
          onSelect={selectItem}
        />}

        {selectedItemKey && <RecipeSelection
          itemKey={selectedItemKey}
          input={input}
          noAlternates={!alternates}
          noFicsmas={!ficsmas}
          onSelect={(x) => { onSelect(x); closeMenu(); }}
        />}
      </Box>
    </Menu>
  )
}