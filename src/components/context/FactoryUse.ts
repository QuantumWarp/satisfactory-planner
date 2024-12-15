import { useContext } from "react";
import { FactoryContext } from "./FactoryContext";

export function useFactory() {
  return useContext(FactoryContext)
};
