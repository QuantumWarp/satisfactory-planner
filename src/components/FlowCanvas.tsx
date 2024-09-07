import '@xyflow/react/dist/style.css';
import { addEdge, Background, Controls, Edge, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { useCallback, useState } from 'react';
import RecipeNode from './nodes/RecipeNode';
import OtherNode from './nodes/OtherNode';

const nodeTypes = {
  recipeNode: RecipeNode,
  otherNode: OtherNode
};

// const initialNodes = [
//   createNode(allRecipes[Math.floor(Math.random() * allRecipes.length)])
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

//          setNodes((nodes) => nodes.concat(createNode(allRecipes[Math.floor(Math.random() * allRecipes.length)])))

export function FlowCanvas() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [open, setOpen] = useState<boolean>(true);


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={() => setOpen(true)}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
