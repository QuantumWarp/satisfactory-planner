import '@xyflow/react/dist/style.css';
import { addEdge, Background, Connection, Controls, Edge, FinalConnectionState, MiniMap, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { createNode, getSourceInfo, invertType, nodeTypes, NodeTypes, toPerMin } from '../model/node.creator';
import { InputType } from '../model/data/enums';
import { getRecipes } from './menus/recipe/helper';
import { useColorScheme } from '@mui/material';
import { ConnectionMenu } from './menus/ConnectionMenu';

export function FlowCanvas() {
  const [deleteAnchor, setDeleteAnchor] = useState<HTMLElement>();
  const [deleteEdge, setDeleteEdge] = useState<Edge>();

  const { mode } = useColorScheme();
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeTypes>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, state: FinalConnectionState) => {
      if (state.isValid) return;
      if (event instanceof TouchEvent) return;
      if (!state.fromNode || !state.fromHandle) return;

      const info = getSourceInfo(state.fromNode, state.fromHandle);
      const recipes = getRecipes(info.itemKey, invertType(info.input));
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newNodeIsTarget = info.input === InputType.Product;

      let newNode = null;
      if (recipes.length === 1) {
        const recipe = recipes[0];
        const recipeAmount = newNodeIsTarget
          ? recipe.ingredients.find(x => x.itemKey === info.itemKey)!.amount
          : recipe.products.find(x => x.itemKey === info.itemKey)!.amount;
        const newRecipePerMin = toPerMin(recipeAmount, recipe.duration);
        const multiplier = info.amountPerMin / newRecipePerMin;
        newNode = createNode("recipeNode", { recipe: recipes[0], multiplier }, position);
      } else {
        newNode = createNode(
          "chooseNode",
          { itemKey: info.itemKey, input: invertType(info.input), currentAmountPerMin: info.amountPerMin },
          position
        );
      }

      const newEdge: Edge = {
        id: newNode.id,   
        source: newNodeIsTarget ? state.fromNode.id : newNode.id,
        sourceHandle: newNodeIsTarget ? state.fromHandle.id : "product-" + info.itemKey,
        target: newNodeIsTarget ? newNode.id : state.fromNode.id,
        targetHandle: newNodeIsTarget ? "ingredient-" + info.itemKey : state.fromHandle.id
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    [screenToFlowPosition, setEdges, setNodes],
  );

 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        colorMode={mode}
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onEdgeClick={(e, edge) => {
          setDeleteAnchor(e.target as HTMLElement); 
          setDeleteEdge(edge);
        }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>

      <ConnectionMenu
        anchorEl={deleteAnchor}
        edge={deleteEdge}
        onClose={() => setDeleteAnchor(undefined)}
      />
    </div>
  );
}
