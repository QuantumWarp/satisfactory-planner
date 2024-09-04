import { NodeProps, Node } from '@xyflow/react';
import RecipeNodeRow from './RecipeNodeRow';
 
type RecipeNodeProps = NodeProps<Node<{

}>>;
 
export default function RecipeNode({ data }: RecipeNodeProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "350px"
      }}
    >
      <div
        style={{
          backgroundColor: "#474747",
          borderRadius: "5px 5px 0 0",
          color: "white",
          padding: "6px 10px"
        }}
      >
        Silicon Circuit Board
      </div>

      <RecipeNodeRow index={0} input={false} item="Circuit Board" amount={345} />
      <RecipeNodeRow index={1} input={true} item="Copper Sheet" amount={759} />
      <RecipeNodeRow index={2} input={true} item="Silica" amount={759} />
    </div>
  );
}