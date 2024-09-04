import { Handle, Position } from '@xyflow/react';
 
type RecipeNodeRowProps = {
  index: number;
  input: boolean;
  item: string;
  amount: number;
};

const arrow = (input: boolean) => (
  <div
    style={{
      fontSize: "0.6em",
      transform: "scaleY(1.5)",
      color: input ? "#317f3e" : "#d99b75",
      marginLeft: input ? 0 : 5,
      marginRight: input ? 5 : 0
    }}
  >
    &#9654;
  </div>
)

export default function RecipeNodeRow({ input, item, amount, index }: RecipeNodeRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: "6px 5px",
        border: "1px solid lightgrey",
        borderTop: "none",
        backgroundColor: input ? "#dff3dc" : "#efefef",
      }}
    >
      {input && arrow(true)}

      <div
        style={{
          flex: 1,
          marginLeft: 5
        }}
      >
        {item}
      </div>
  
      <div
        style={{
          fontWeight: "bold",
          marginRight: 10
        }}
      >
        {amount}
      </div>

      <div
        style={{
          opacity: 0.4,
          marginRight: 5
        }}
      >
        /min
      </div>

      {!input && arrow(false)}

      <Handle
        type="source"
        position={input ? Position.Left : Position.Right}
        id={item}
        style={{ top: index * 37 + 55, background: '#555' }}
        isConnectable
      />
    </div>
  );
}