import { createContext } from "react";
import { Factory } from "../../storage/factory";
import { defaultFactory } from "../../storage/factory.storage";

type FactoryContextType = {
  ficsmas: boolean;
  setFicsmas: (value: boolean) => void;
  alternates: boolean;
  setAlternates: (value: boolean) => void;
  factory: Factory;
  setName: (name: string) => void;
  save: () => void;
  load: (id: string) => void;
  create: () => void;
  remove: () => void;
};

export const FactoryContext = createContext<FactoryContextType>({
  alternates: true,
  setFicsmas: () => {},
  ficsmas: false,
  setAlternates: () => {},
  factory: defaultFactory(),
  setName: () => {},
  save: () => {},
  load: () => {},
  create: () => {},
  remove: () => {},
});
