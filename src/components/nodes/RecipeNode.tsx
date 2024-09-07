import { NodeProps, Node } from '@xyflow/react';
import RecipeNodeRow from './RecipeNodeRow';
import { Recipe } from '../../model/data/recipe';
import { allItems } from '../../resources/data.helper';
import { InputType } from '../../model/data/enums';
import "./recipe-node.css";
 
type RecipeNodeProps = NodeProps<Node<{
  recipe: Recipe;
  multiplier: number;
}>>;
 
export default function RecipeNode({ data }: RecipeNodeProps) {
  const { recipe } = data;
  const perMin = 60 / recipe.duration;
  return (
    <div
      className="recipe-node"
      style={{
        backgroundColor: "white",
        width: "360px",
      }}
    >
      <div
        style={{
          backgroundColor: "#474747",
          borderRadius: "5px 5px 0 0",
          color: "white",
          padding: "6px 10px",
        }}
      >
        {recipe.name}
      </div>

      {recipe.products.map((product) => {
        const item = allItems.find((x) => x.key === product.itemKey)!;
        return (
          <RecipeNodeRow
            key={"product-" + item.key}
            input={InputType.Product}
            item={item}
            amount={perMin * product.amount * data.multiplier}
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
            amount={perMin * product.amount * data.multiplier}
          />
        );
      })}
    </div>
  );
}