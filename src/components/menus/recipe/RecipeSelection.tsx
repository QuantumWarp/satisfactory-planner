import { Box, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import { allItems } from "../../../model/data.helper";
import { Recipe } from "../../../model/data/recipe";
import { getRecipes } from "./helper";
import { InputType } from "../../../model/data/enums";

type RecipeSelectionProps = {
  itemKey?: string;
  input?: InputType;
  noAlternates?: boolean;
  onSelect: (recipe: Recipe) => void;
}

export function RecipeSelection({ 
  itemKey,
  input = InputType.Both,
  noAlternates = false,
  onSelect,
}: RecipeSelectionProps) {
  const recipes = getRecipes(itemKey, input, noAlternates);

  return (
    <Box width={350}>
      {recipes.map((recipe) => {
        const products = allItems.filter((x) => recipe.products.find((y) => y.itemKey === x.key));
        const ingredients = allItems.filter((x) => recipe.ingredients.find((y) => y.itemKey === x.key));

        return (
          <MenuItem
            key={recipe.name + recipe.isAlternate}
            onClick={() => onSelect(recipe)}
          >
            {ingredients.map((x) => (
              <ListItemIcon key={x.key}>
                <img src={x.icon} height={40} />
              </ListItemIcon>
            ))}
            <ListItemText
              sx={{
                ml: 2,
                textAlign: "center"
              }}
            >
              <Typography fontWeight={recipe.isAlternate ? "normal" : "bold"}>{recipe.name}</Typography>
            </ListItemText>
            {products.map((x) => (
              <ListItemIcon key={x.key}>
                <img src={x.icon} height={40} />
              </ListItemIcon>
            ))}
          </MenuItem>
        )
      })}
    </Box>
  )
}