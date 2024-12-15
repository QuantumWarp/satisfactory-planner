import { Handle, Node, XYPosition } from "@xyflow/react";
import { v4 as uuid } from "uuid";
import ChooseNode, { ChooseNodeProps } from "../components/nodes/ChooseNode";
import OtherNode, { OtherNodeProps } from "../components/nodes/OtherNode";
import RecipeNode, { RecipeNodeProps } from "../components/nodes/RecipeNode";
import { InputType } from "./data/enums";

export const nodeTypes = {
  recipeNode: RecipeNode,
  otherNode: OtherNode,
  chooseNode: ChooseNode
};

type NodePropsMap = {
  recipeNode: RecipeNodeProps;
  chooseNode: ChooseNodeProps;
  otherNode: OtherNodeProps;
};

export type NodeTypes = {
  [K in keyof NodePropsMap]: Node<NodePropsMap[K]>;
}[keyof NodePropsMap];

export const createNode = <T extends keyof NodePropsMap>(
  type: T,
  data: NodePropsMap[T],
  position: XYPosition = { x: 0, y: 0 }
) => {
  return {
    id: uuid(),
    type,
    position,
    data
  };
}

export const invertType = (type: InputType) => {
  if (type === InputType.Ingredient) return InputType.Product;
  if (type === InputType.Product) return InputType.Ingredient;
  return InputType.Both;
}

export const getSourceInfo = (node: Node, handle: Handle) => {
  const input = handle.id!.split('-')[0] === "ingredient" ? InputType.Ingredient : InputType.Product;
  const itemKey = handle.id!.split('-')[1];
  const recipeNodeProps = node.data as RecipeNodeProps;
  const baseAmount = input === InputType.Ingredient
    ? recipeNodeProps.recipe.ingredients.find(x => x.itemKey === itemKey)!.amount
    : recipeNodeProps.recipe.products.find(x => x.itemKey === itemKey)!.amount;
  const baseAmountPerMin = toPerMin(baseAmount, recipeNodeProps.recipe.duration);
  return {
    itemKey,
    input,
    amountPerMin: baseAmountPerMin * (recipeNodeProps.multiplier || 1)
  };
}


export const toPerMin = (amount: number, duration: number) => {
  return (60 / duration) * amount
}