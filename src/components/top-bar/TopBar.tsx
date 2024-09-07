import { AppBar, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { OtherMenu } from "../menus/OtherMenu";
import { RecipeMenu } from "../menus/recipe/RecipeMenu";
import { useReactFlow } from "@xyflow/react";
import { createNode, createOtherNode } from "../../model/node.creator";
import { ExtractorMenu } from "../menus/ExtractorMenu";

export function TopBar() {
  const { setNodes } = useReactFlow();

  const [extractorOpen, setExtractorOpen] = useState<HTMLElement | null>(null);
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
            onClick={(e) => setExtractorOpen(e.currentTarget)}
            sx={{ fontSize: 20, px: 6 }}
            endIcon={<img src=".\src\resources\icons\buildings\Miner_Mk.1.png" height={52} />}
          >
            Extractor
          </Button>

          <Button
            onClick={(e) => setRecipeOpen(e.currentTarget)}
            sx={{ fontSize: 20, px: 6 }}
            endIcon={<img src=".\src\resources\icons\items\Smart_Plating.png" height={60} />}
          >
            Recipe
          </Button>

          <Button
            onClick={(e) => setOtherOpen(e.currentTarget)}
            sx={{ fontSize: 20, px: 6 }}
            endIcon={<img src=".\src\resources\icons\buildings\Storage_Container.png" height={52} />}
          >
            Other
          </Button>
        </Box>
      </Box>

      <ExtractorMenu
        anchorEl={extractorOpen}
        onSelect={(x) => setNodes((nodes) => nodes.concat(createNode(x)))}
        onClose={() => setExtractorOpen(null)}
      />

      <RecipeMenu
        anchorEl={recipeOpen}
        onSelect={(x) => setNodes((nodes) => nodes.concat(createNode(x)))}
        onClose={() => setRecipeOpen(null)}
      />

      <OtherMenu
        anchorEl={otherOpen}
        onSelect={(x) => setNodes((nodes) => nodes.concat(createOtherNode(x)))}
        onClose={() => setOtherOpen(null)}
      />
    </AppBar>
  )
}