import { NodeProps, Node, Handle, Position, useReactFlow } from '@xyflow/react';
import { InputType } from '../../model/data/enums';
import { Box } from '@mui/material';
import "./node.css";
import { RecipeMenu } from '../menus/recipe/RecipeMenu';
import { useEffect, useRef, useState } from 'react';
import { Recipe } from '../../model/data/recipe';
import { toPerMin } from '../../model/node.creator';
 
export type ChooseNodeProps = {
  itemKey: string;
  input: InputType;
  currentAmountPerMin: number;
};
 
export default function ChooseNode({ data, id }: NodeProps<Node<ChooseNodeProps>>) {
  const { itemKey, input, currentAmountPerMin } = data;

  const anchorElRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { updateNode } = useReactFlow();

  useEffect(() => {
    if (anchorElRef.current && !anchorEl) {
      setAnchorEl(anchorElRef.current);
    }
  }, [anchorEl]);

  const convertNode = (recipe: Recipe) => {
    const recipeAmount = input === InputType.Ingredient
      ? recipe.ingredients.find(x => x.itemKey === itemKey)!.amount
      : recipe.products.find(x => x.itemKey === itemKey)!.amount;
    const recipeAmountPerMin = toPerMin(recipeAmount, recipe.duration);
    const multiplier = currentAmountPerMin / recipeAmountPerMin;
    updateNode(id, {
      type: "recipeNode",
      data: {
        recipe,
        multiplier
      }
    });
  };

  return (
    <Box ref={anchorElRef}>
      <Handle type="target" position={Position.Left} />
      
      <RecipeMenu
        itemKey={itemKey}
        input={input}
        anchorEl={anchorEl}
        onSelect={(x) => convertNode(x)}
        onClose={() => {}}
      />
    </Box>
  );
}