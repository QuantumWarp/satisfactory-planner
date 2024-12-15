import { Box, Button, ButtonGroup, Card, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { OtherMenu } from "../menus/OtherMenu";
import { RecipeMenu } from "../menus/recipe/RecipeMenu";
import { useReactFlow } from "@xyflow/react";
import { createNode } from "../../model/node.creator";
import { ExtractorMenu } from "../menus/ExtractorMenu";
import { EditFactoryDialog } from "../dialogs/EditFactoryDialog";
import { useFactory } from "../context/FactoryUse";

export function ToolBar() {
  const { setNodes } = useReactFlow();
  const { factory } = useFactory();

  const [nameOpen, setNameOpen] = useState(false);
  const [extractorOpen, setExtractorOpen] = useState<HTMLElement | null>(null);
  const [recipeOpen, setRecipeOpen] = useState<HTMLElement | null>(null);
  const [otherOpen, setOtherOpen] = useState<HTMLElement | null>(null);

  return (
    <Box position="absolute" zIndex={1} top={85} left={10} display="flex" alignItems="stretch">
      <Card>
        <Box marginLeft="auto" display="flex" alignItems="stretch">
          <ButtonGroup>
            <Button variant="text" sx={{ px: 2 }} onClick={() => setNameOpen(true)}>
              <Typography fontWeight="bold" color="textPrimary" textTransform="none">
                {factory.name || "New Factory"}
              </Typography>
            </Button>

            <Divider orientation="vertical" />

            <Button variant="text" sx={{ px: 2 }} onClick={(e) => setExtractorOpen(e.currentTarget)}>
              Extract
            </Button>

            <Divider orientation="vertical" />

            <Button variant="text" sx={{ px: 2 }} onClick={(e) => setRecipeOpen(e.currentTarget)}>
              Recipe
            </Button>

            <Divider orientation="vertical" />

            <Button variant="text" sx={{ px: 2 }} onClick={(e) => setOtherOpen(e.currentTarget)}>
              Other
            </Button>
          </ButtonGroup>
        </Box>
      </Card>

      <EditFactoryDialog
        open={nameOpen}
        onClose={() => setNameOpen(false)}
      />

      <ExtractorMenu
        anchorEl={extractorOpen}
        onSelect={(recipe) => setNodes((nodes) => nodes.concat(createNode("recipeNode", { recipe })))}
        onClose={() => setExtractorOpen(null)}
      />

      <RecipeMenu
        anchorEl={recipeOpen}
        onSelect={(recipe) => setNodes((nodes) => nodes.concat(createNode("recipeNode", { recipe })))}
        onClose={() => setRecipeOpen(null)}
      />

      <OtherMenu
        anchorEl={otherOpen}
        onSelect={(x) => setNodes((nodes) => nodes.concat(createNode("otherNode", x)))}
        onClose={() => setOtherOpen(null)}
      />
    </Box>
  )
}