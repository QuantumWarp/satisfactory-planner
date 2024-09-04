import { Recipe } from "./data/recipe"

type ItemAmount = {
  name: string,
  amount: number
}

export type NodeData = {
  recipe: Recipe,
  inputs: ItemAmount[]
}