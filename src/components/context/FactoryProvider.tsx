import { ReactNode, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { FactoryContext } from "./FactoryContext";
import { useReactFlow } from "@xyflow/react";
import { defaultFactory, deleteFactory, getFactory, getInitialFactory, saveFactory } from "../../storage/factory.storage";

type FactoryProviderProps = {
  children: ReactNode;
}

export function FactoryProvider({ children }: FactoryProviderProps) {
  const { toObject, setNodes, setEdges } = useReactFlow();

  const [factory, setFactory] = useState(getInitialFactory());

  const [ficsmas, setFicsmas] = useState(false);
  const [alternates, setAlternates] = useState(true);

  useEffect(() => {
    const initialFactory = getInitialFactory();
    setNodes(initialFactory.nodes || []);
    setEdges(initialFactory.edges || []);
  }, [setEdges, setNodes]);

  const value = useMemo(() => {
    const setName = (name: string) => {
      const newFactory = {
        ...factory, 
        id: factory.id || uuid(),
        name,
      };
      setFactory(newFactory);
      saveFactory(newFactory);
    }

    const save = () => {
      const json = toObject();
      const newFactory = {
        ...factory,
        nodes: json.nodes,
        edges: json.edges
      };

      // TODO: Avoid repeating save causing loop
      if (JSON.stringify(newFactory) !== JSON.stringify(factory)) {
        setFactory({ ...newFactory, updated: Date.now() });
        saveFactory({ ...newFactory, updated: Date.now() });
      }
    };
    
    const load = (id: string) => {
      const newFactory = getFactory(id);
      setFactory(newFactory);
      setNodes(newFactory.nodes || []);
      setEdges(newFactory.edges || []);
    };

    const create = () => {
      setFactory(defaultFactory());
      setNodes([]);
      setEdges([]);
    };

    const remove = () => {
      if (!factory.id) return;
      create();
      deleteFactory(factory.id);
    };

    return {
      ficsmas,
      setFicsmas,
      alternates,
      setAlternates,
      factory,
      setName,
      save,
      load,
      create,
      remove
    };
  }, [alternates, factory, ficsmas, setEdges, setNodes, toObject])

  return (
    <FactoryContext.Provider value={value}>
      {children}
    </FactoryContext.Provider>
  );
}
