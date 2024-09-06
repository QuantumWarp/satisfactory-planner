import '@xyflow/react/dist/style.css';
import { addEdge, Background, Controls, Edge, MiniMap, Node, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { useCallback, useState } from 'react';
import RecipeNode from './RecipeNode';
import { ItemMenu } from './ItemMenu';
import { createNode } from '../model/node.creator';
import { allRecipes } from '../resources/data.helper';
import { RecipeMenu } from './menus/recipe/RecipeMenu';

const nodeTypes = {
  recipeNode: RecipeNode,
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
