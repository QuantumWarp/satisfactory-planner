import { Factory } from "./factory";
import { example } from "./factory.example";

export const getFactories = (): Factory[] => {
  const keys = Object.keys(localStorage);
  const factoryIds = keys
    .filter((x) => x.startsWith("factory-"))
    .filter((x) => x !== "factory-unsaved")
    .map((x) => x.replace("factory-", ""));
  const factories = factoryIds.map((x) => getFactory(x));

  return factories.sort((a, b) => a.name.localeCompare(b.name));
}

export const getFactory = (id?: string): Factory => {
  const key = id || "unsaved";
  const result = localStorage.getItem(`factory-${key}`);
  if (!result) throw new Error("Factory not found");
  return JSON.parse(result!);
}

export const saveFactory = (factory: Factory): void => {
  const key = factory.id || "unsaved";
  localStorage.setItem(`factory-${key}`, JSON.stringify(factory));
}

export const deleteFactory = (id: string): void => {
  localStorage.removeItem(`factory-${id}`);
}

export const getInitialFactory = (): Factory => {
  const loaded = localStorage.getItem("loaded");
  localStorage.setItem("loaded", "true");

  if (!loaded) {
    saveFactory(example);
  }

  const keys = Object.keys(localStorage);
  const factoryIds = keys
    .filter((x) => x.startsWith("factory-"))
    .map((x) => x.replace("factory-", ""));
  const factories = factoryIds.map((x) => getFactory(x));

  return factories.sort((a, b) => a.updated > b.updated ? -1 : 1)[0] || defaultFactory();
}

export const defaultFactory = (): Factory => {
  return {
    id: undefined,
    name: "",
    nodes: [],
    edges: [],
    updated: Date.now(),
  };
}