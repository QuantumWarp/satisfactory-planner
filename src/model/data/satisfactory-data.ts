import { Item } from "./item"
import { Producer } from "./producer"
import { Recipe } from "./recipe"

export type SatisfactoryData = {
  items: Item[],
  producers: Producer[],
  recipes: Recipe[]
}
