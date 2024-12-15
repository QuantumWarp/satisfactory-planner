import { Edge, Node } from "@xyflow/react";

export interface Factory {
  id?: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  updated: number;
}
