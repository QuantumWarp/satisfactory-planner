import { NodeProps, Node } from '@xyflow/react';
import RecipeNodeRow from './RecipeNodeRow';
import { Recipe } from '../model/data/recipe';
import { allItems } from '../resources/data.helper';
 
type RecipeNodeProps = NodeProps<Node<{
  recipe: Recipe;
  multiplier: number;
}>>;
 
export default function RecipeNode({ data }: RecipeNodeProps) {
  const { recipe } = data;
  const perMin = 60 / recipe.duration;
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "360px"
      }}
    >
      <div
        style={{
          backgroundColor: "#474747",
          borderRadius: "5px 5px 0 0",
          color: "white",
          padding: "6px 10px"
        }}
      >
        {recipe.name}
      </div>

      {recipe.products.map((product, index) => {
        const item = allItems.find((x) => x.key === product.itemKey)!;
        return (
          <RecipeNodeRow
            key={"product-" + item.key}
            index={index}
            input={false}
            item={item}
            amount={perMin * product.amount * data.multiplier}
          />
        );
      })}
      
      {recipe.ingredients.map((product, index) => {
        const item = allItems.find((x) => x.key === product.itemKey)!;
        return (
          <RecipeNodeRow
            key={"ingredient-" + item.key}
            index={index + recipe.products.length}
            input={true}
            item={item}
            amount={perMin * product.amount * data.multiplier}
          />
        );
      })}
    </div>
  );
}