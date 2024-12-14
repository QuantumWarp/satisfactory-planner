import { NodeProps, Node } from '@xyflow/react';
import RecipeNodeRow from './RecipeNodeRow';
import { Recipe } from '../../model/data/recipe';
import { allItems } from '../../model/data.helper';
import { InputType } from '../../model/data/enums';
import "./node.css";
import { RecipeNodeInfo } from './RecipeNodeInfo';
import { createTheme, ThemeProvider } from '@mui/material';
 
export type RecipeNodeProps = {
  recipe: Recipe;
  multiplier?: number;
};
 
export default function RecipeNode({ data, id }: NodeProps<Node<RecipeNodeProps>>) {
  const { recipe } = data;
  const multiplier = data.multiplier || 1;
  const perMin = 60 / recipe.duration;

  return (
    <div
      className="node"
      style={{
        position: "relative",
        width: recipe.isExtraction ? "260px" : "360px",
      }}
    >
      <ThemeProvider theme={createTheme()}>
        <RecipeNodeInfo nodeId={id} recipe={recipe} multiplier={multiplier} />
        <div
          style={{
            backgroundColor: "#474747",
            borderRadius: "5px 5px 0 0",
            color: "white",
            padding: "6px 10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            {recipe.name}
            {recipe.isExtraction ? " - Extraction" : ""}
          </span>
          <span style={{ fontWeight: "bold" }}>
            x{Math.round(multiplier || 1)}
          </span>
        </div>

        {recipe.products.map((product) => {
          const item = allItems.find((x) => x.key === product.itemKey)!;
          return (
            <RecipeNodeRow
              key={"product-" + item.key}
              input={InputType.Product}
              item={item}
              amount={perMin * product.amount * multiplier}
            />
          );
        })}
        
        {recipe.ingredients.map((product) => {
          const item = allItems.find((x) => x.key === product.itemKey)!;
          return (
            <RecipeNodeRow
              key={"ingredient-" + item.key}
              input={InputType.Ingredient}
              item={item}
              amount={perMin * product.amount * multiplier}
            />
          );
        })}
      </ThemeProvider>
    </div>
  );
}