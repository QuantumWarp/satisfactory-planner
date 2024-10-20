import { FormType, InputType } from '../../model/data/enums';
import { Item } from '../../model/data/item';
import { RowHandle } from './RowHandle';
 
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
  const inputName = input === InputType.Ingredient ? "ingredient" : "product";
  const handleKey = `${inputName}-${item.key}`

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
        {Math.round(amount * 100) / 100}
      </div>

      <div
        style={{
          opacity: 0.4,
          marginRight: 5
        }}
      >
        {item.form !== FormType.Solid ? "m³" : ""}/min
      </div>

      {input === InputType.Product && arrow(false)}

      <RowHandle handleKey={handleKey} input={input} />
    </div>
  );
}