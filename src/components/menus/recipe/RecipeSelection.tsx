import { Box, ListItemText, MenuItem, Tooltip, Typography } from "@mui/material";
import { allItems } from "../../../model/data.helper";
import { Recipe } from "../../../model/data/recipe";
import { getRecipes } from "./helper";
import { InputType } from "../../../model/data/enums";
import { East } from "@mui/icons-material";
import { Item } from "../../../model/data/item";

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

  const renderItems = (items: Item[]) => {
    return (
      <Box>
        {items.map((x) => (
          <img key={x.key} src={x.icon} height={40} />
        ))}
      </Box>
    );
  };

  return (
    <Box width={350}>
      {recipes.map((recipe) => {
        const products = allItems.filter((x) => recipe.products.find((y) => y.itemKey === x.key));
        const ingredients = allItems.filter((x) => recipe.ingredients.find((y) => y.itemKey === x.key));
        const bold = products.find((x) => x.key === itemKey);

        return (
          <MenuItem
            key={recipe.name + recipe.isAlternate}
            onClick={() => onSelect(recipe)}
          >
            <Tooltip
              placement="right"
              slotProps={{
                tooltip: { sx: { backgroundColor: "rgba(97, 97, 97)"} },
                popper: { modifiers: [{
                  name: "offset",
                  options: { offset: [0, 10] },
                }]},
              }}
              
              title={
                <Box display="flex" flexDirection="column" alignItems="center">
                  {recipe.isAlternate && (
                    <Typography mb={0.5}>Alternate</Typography>
                  )}
                  
                  <Box display="flex" alignItems="center" mt={0.5}>
                    {renderItems(ingredients)}
                    <East fontSize="small" sx={{ mx: 0.5 }} />
                    {renderItems(products)}
                  </Box>
                </Box>
              }
            >
              <ListItemText>
                <Typography fontWeight={bold ? "bold" : "normal"}>
                  {recipe.name}{recipe.isAlternate ? " *" : ""}
                </Typography>
              </ListItemText>
            </Tooltip>
          </MenuItem>
        )
      })}
    </Box>
  )
}