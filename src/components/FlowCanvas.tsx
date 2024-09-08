import '@xyflow/react/dist/style.css';
import { addEdge, Background, Controls, Edge, MiniMap, OnConnectStart, ReactFlow, useEdgesState, useNodesState, useReactFlow, useUpdateNodeInternals } from '@xyflow/react';
import { useCallback, useRef, useState } from 'react';
import RecipeNode from './nodes/RecipeNode';
import OtherNode from './nodes/OtherNode';
import ChooseNode from './nodes/ChooseNode';
import { createChooseNode, createNode, createOtherNode, getInfoFromHandle, toPerMin } from '../model/node.creator';
import { InputType } from '../model/data/enums';
import { getRecipes } from './menus/recipe/helper';

const nodeTypes = {
  recipeNode: RecipeNode,
  otherNode: OtherNode,
  chooseNode: ChooseNode
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
  const updateNodeInternals = useUpdateNodeInternals();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectData = useRef<any>(null);
  const { screenToFlowPosition, getNode, getEdges, getNodes } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId, handleId }) => {
    if (!nodeId || !handleId) return;
    const node = getNode(nodeId);
    if (node?.type !== 'recipeNode') return;

    connectData.current = {
      nodeId: nodeId,
      nodeData: node.data,
      handleId: handleId,
    };
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectData.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        const info = getInfoFromHandle(connectData.current.handleId, connectData.current.nodeData);
        const newNodeIsTarget = info.input === InputType.Product;
        const recipes = getRecipes(info.itemKey, newNodeIsTarget ? InputType.Ingredient : InputType.Product);
        let newNode = null;

        if (recipes.length === 1) {
          const recipe = recipes[0];
          const recipeAmount = newNodeIsTarget
            ? recipe.ingredients.find(x => x.itemKey === info.itemKey)!.amount
            : recipe.products.find(x => x.itemKey === info.itemKey)!.amount;
          const newRecipePerMin = toPerMin(recipeAmount, recipe.duration);
          const multiplier = info.amountPerMin / newRecipePerMin;
          newNode = createNode(recipes[0], multiplier);
          newNode.position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
        } else {
          newNode = createChooseNode(
            {
              itemKey: info.itemKey,
              input: newNodeIsTarget ? InputType.Ingredient : InputType.Product,
              currentAmountPerMin: info.amountPerMin
            },
            screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            }),
          );
        }


        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => {
          const edge = {
            id: newNode.id,   

            source: newNodeIsTarget ? connectData.current.nodeId : newNode.id,
            sourceHandle: newNodeIsTarget ? connectData.current.handleId : "product-" + info.itemKey,

            target: newNodeIsTarget ? newNode.id : connectData.current.nodeId,
            targetHandle: newNodeIsTarget ? "ingredient-" + info.itemKey : connectData.current.handleId
          };
          return eds.concat(edge);
        });
      }
    },
    [screenToFlowPosition, setEdges, setNodes],
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
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
