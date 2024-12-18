import { Box, IconButton, Slider } from "@mui/material";
import { Recipe } from "../../model/data/recipe";
import { allProducers } from "../../model/data.helper";
import {
  Bolt as PowerIcon,
  Delete as DeleteIcon,
  Assistant as CustomIcon
} from "@mui/icons-material";
import { useReactFlow } from "@xyflow/react";
import { SetMultiplierDialog } from "../dialogs/SetMultiplierDialog";
import { useState } from "react";

type RecipeNodeInfoProps = {
  nodeId: string;
  recipe: Recipe;
  multiplier: number;
}

export function RecipeNodeInfo({ nodeId, recipe, multiplier }: RecipeNodeInfoProps) {
  const { deleteElements, updateNode } = useReactFlow();
  const [dialogOpen, setDialogOpen] = useState(false);
  const producer = allProducers.find(x => x.key === recipe.producerKey)!;

  const mappedValues = [
    0.1, 0.2, 0.33, 0.5, 0.67, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 8, 10, 15, 20, 50, 100
  ];

  const closestValue = mappedValues.reduce((closest, x) => {
    const xIsCloser = Math.abs(x - multiplier) < Math.abs(closest - multiplier);
    return xIsCloser ? x : closest
  });
  const sliderValue = mappedValues.indexOf(closestValue);

  const setMultiplier = (newMult: number) => {
    updateNode(nodeId, { data: { recipe, multiplier: newMult }})
  };

  return (
    <Box
      className="node-info"
      position="absolute"
      sx={({ palette }) => ({
        height: "60px",
        zIndex: -1,
        width: "90%",
        backgroundColor: "#efefef",
        border: `2px solid ${palette.mode === "dark" ? palette.grey[600] : "#474747"}`,
        borderBottom: "none",
        borderRadius: "5px 5px 0 0",
        color: "black",
        boxSizing: "border-box",
        padding: "6px 10px",
        marginRight: "auto",
        marginLeft: "auto",
        left: "50%",
        transform: "translate(-50%, 0)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      })}
    >
      <Box mb={-1.2}>
        <Slider
          className="nodrag"
          value={sliderValue}
          step={1}
          marks
          min={0}
          max={mappedValues.length - 1}
          scale={(x) => mappedValues[x]}
          onChange={(_, newValue) => setMultiplier(mappedValues[newValue as number])}
          size="small"
        />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <span
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {recipe.isAlternate ? "Alt - " : ""}
          {producer.name.replace(" Extractor", "")}
          <PowerIcon />
          {Math.round(producer.powerConsumption * multiplier * 100) / 100}
        </span>

        <Box sx={{ my: -.2 }} className="nodrag">
          <IconButton size="small" onClick={() => setDialogOpen(true)}>
            <CustomIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            sx={{ my: -1.5 }}
            onClick={() => deleteElements({ nodes: [{ id: nodeId }] })}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>

        <SetMultiplierDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          value={multiplier}
          onChange={(x) => setMultiplier(x)}
        />
      </Box>
    </Box>
  );
}