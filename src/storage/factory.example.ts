import { Factory } from "./factory";

export const example: Factory = {
  id: "example",
  name: "Example",
  nodes: [
    {
      id: "1",
      type: "recipeNode",
      position: { x: -900, y: 0 },
      data: {
        recipe: {
          name: "Copper Ore",
          producerKey: "Build_MinerMk2_C",
          ingredients: [],
          products: [
            { itemKey: "Desc_OreCopper_C", amount: 1 }
          ],
          duration: 0.5,
          isAlternate: false,
          isExtraction: true
        }
      }
    },
    {
      id: "2",
      type: "recipeNode",
      position: { x: 800, y: -38 },
      data: {
        recipe: {
          name: "Rotor",
          producerKey: "Build_AssemblerMk1_C",
          ingredients: [
            { itemKey: "Desc_IronRod_C", amount: 5 },
            { itemKey: "Desc_IronScrew_C", amount: 25 }
          ],
          products: [
            { itemKey: "Desc_Rotor_C", amount: 1 }
          ],
          duration: 15,
          isAlternate: false,
          isExtraction: false
        },
        multiplier: 8 / 3
      }
    },
    {
      id: "3",
      type: "recipeNode",
      position: { x: -100, y: 0 },
      data: {
        recipe: {
          name: "Iron Rod",
          producerKey: "Build_ConstructorMk1_C",
          ingredients: [
            { itemKey: "Desc_IronIngot_C", amount: 1 }
          ],
          products: [
            { itemKey: "Desc_IronRod_C", amount: 1 }
          ],
          duration: 4,
          isAlternate: false,
          isExtraction: false
        },
        multiplier: 8
      }
    },
    {
      id: "4",
      type: "recipeNode",
      position: { x: -550, y: 0 },
      data: {
        recipe: {
          name: "Iron Ingot",
          producerKey: "Build_SmelterMk1_C",
          ingredients: [
            { itemKey: "Desc_OreIron_C", amount: 1 }
          ],
          products: [
            { itemKey: "Desc_IronIngot_C", amount: 1 }
          ],
          duration: 2,
          isAlternate: false,
          isExtraction: false
        },
        multiplier: 4
      }
    },
    {
      id: "5",
      type: "recipeNode",
      position: { x: 350, y: 100 },
      data: {
        recipe: {
          name: "Screw",
          producerKey: "Build_ConstructorMk1_C",
          ingredients: [
            { itemKey: "Desc_IronRod_C", amount: 1 }
          ],
          products: [
            { itemKey: "Desc_IronScrew_C", amount: 4 }
          ],
          duration: 6,
          isAlternate: false,
          isExtraction: false
        },
        multiplier: 20 / 3
      }
    }
  ],
  edges: [
    {
      id: "3",
      source: "3",
      sourceHandle: "product-Desc_IronRod_C",
      target: "2",
      targetHandle: "ingredient-Desc_IronRod_C"
    },
    {
      id: "4",
      source: "4",
      sourceHandle: "product-Desc_IronIngot_C",
      target: "3",
      targetHandle: "ingredient-Desc_IronIngot_C"
    },
    {
      id: "5",
      source: "3",
      sourceHandle: "product-Desc_IronRod_C",
      target: "5",
      targetHandle: "ingredient-Desc_IronRod_C"
    },
    {
      source: "5",
      sourceHandle: "product-Desc_IronScrew_C",
      target: "2",
      targetHandle: "ingredient-Desc_IronScrew_C",
      id: "xy-edge__5product-Desc_IronScrew_C-2ingredient-Desc_IronScrew_C"
    },
    {
      source: "1",
      sourceHandle: "product-Desc_OreCopper_C",
      target: "4",
      targetHandle: "ingredient-Desc_OreIron_C",
      id: "xy-edge__1product-Desc_OreCopper_C-4ingredient-Desc_OreIron_C"
    }
  ],
  updated: 1
}