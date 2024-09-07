import { InputType } from '../../model/data/enums';
import { Item } from '../../model/data/item';
import { RecipeRowHandle } from './RecipeRowHandle';
 
type RecipeNodeRowProps = {
  input: InputType;
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

export default function RecipeNodeRow({ input, item, amount }: RecipeNodeRowProps) {
  return (
    <div
      style={{
        position: "relative",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: "3px 5px",
        border: "1px solid lightgrey",
        borderTop: "none",
        backgroundColor: input === InputType.Ingredient ? "#dff3dc" : "#efefef",
      }}
    >
      {input === InputType.Ingredient && arrow(true)}

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
          marginRight: 3
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

      {input === InputType.Product && arrow(false)}

      <RecipeRowHandle item={item} input={input} />
    </div>
  );
}