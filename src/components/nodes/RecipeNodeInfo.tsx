import { Box } from "@mui/material";
import { Recipe } from "../../model/data/recipe";

type RecipeNodeInfoProps = {
  recipe: Recipe
}

export function RecipeNodeInfo({ recipe }: RecipeNodeInfoProps) {
  return (
    <Box
      className="node-info"
      position="absolute"
      bottom="98%"
      sx={{
        backgroundColor: "#474747",
        borderRadius: "5px 5px 0 0",
        color: "white",
        padding: "6px 10px",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <h3>{recipe.name}</h3>
    </Box>
  );
}