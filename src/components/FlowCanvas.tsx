import '@xyflow/react/dist/style.css';
import { addEdge, Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { useCallback } from 'react';
import RecipeNode from './RecipeNode';

const nodeTypes = {
  recipeNode: RecipeNode,
};

const initialNodes = [
  { id: '1', type: 'recipeNode', position: { x: 0, y: 0 }, data: {} },
  { id: '2', type: 'recipeNode', position: { x: 0, y: 100 }, data: {} },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
