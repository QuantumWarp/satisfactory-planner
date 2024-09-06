import { AppBar, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { OtherMenu } from "../menus/OtherMenu";
import { RecipeMenu } from "../menus/recipe/RecipeMenu";
import { useReactFlow } from "@xyflow/react";
import { createNode } from "../../model/node.creator";

export function TopBar() {
  const { setNodes } = useReactFlow();

  const [recipeOpen, setRecipeOpen] = useState<HTMLElement | null>(null);
  const [otherOpen, setOtherOpen] = useState<HTMLElement | null>(null);

  return (
    <AppBar position="absolute" color="default">
      <Box display="flex" alignItems="stretch">
        <Typography variant="h4" p={2}>
          Satisfactory Planner
        </Typography>

        <Box marginLeft="auto" display="flex" alignItems="stretch">
          <Button
            sx={{ fontSize: 20, px: 6 }}
            endIcon={<img src=".\src\resources\icons\buildings\Miner_Mk.1.png" height={52} />}
          >
            Extractor
          </Button>

          <Button
            onClick={(e) => setRecipeOpen(e.currentTarget)}
            sx={{ fontSize: 20, px: 6 }}
            endIcon={<img src=".\src\resources\icons\buildings\Constructor.png" height={60} />}
          >
            Recipe
          </Button>

          <Button
            onClick={(e) => setOtherOpen(e.currentTarget)}
            sx={{ fontSize: 20, px: 6 }}
            endIcon={<img src=".\src\resources\icons\buildings\Awesome_Sink.png" height={52} />}
          >
            Other
          </Button>
        </Box>
      </Box>

      <RecipeMenu
        anchorEl={recipeOpen}
        onSelect={(x) => setNodes((nodes) => nodes.concat(createNode(x)))}
        onClose={() => setRecipeOpen(null)}
      />

      <OtherMenu
        anchorEl={otherOpen}
        onSelect={() => setOtherOpen(null)}
        onClose={() => setOtherOpen(null)}
      />
    </AppBar>
  )
}