import { Handle, Position } from '@xyflow/react';
import { Item } from '../model/data/item';
 
type RecipeNodeRowProps = {
  index: number;
  input: boolean;
  item: Item;
  amount: number;
};

const arrow = (input: boolean) => (
  <div
    style={{
      fontSize: "0.6em",
      transform: "scaleY(1.5)",
      color: input ? "#317f3e" : "#d99b75",
      marginLeft: input ? 0 : 5,
      marginRight: input ? 10 : 0
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
        padding: "3px 5px",
        border: "1px solid lightgrey",
        borderTop: "none",
        backgroundColor: input ? "#dff3dc" : "#efefef",
      }}
    >
      {input && arrow(true)}

      <img src={item.icon} height={32} />

      <div
        style={{
          flex: 1,
          marginLeft: 10
        }}
      >
        {item.name}
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
        {item.isPiped ? "m³" : ""}/min
      </div>

      {!input && arrow(false)}

      <Handle
        type={input ? "target" : "source"}
        position={input ? Position.Left : Position.Right}
        id={item.key}
        style={{ top: index * 39 + 56, background: '#555' }}
        isConnectable
      />
    </div>
  );
}