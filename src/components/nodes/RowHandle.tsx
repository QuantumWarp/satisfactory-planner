import { Handle, Position } from '@xyflow/react';
import { InputType } from '../../model/data/enums';
import { Box } from '@mui/material';

type RowHandleProps = {
  handleKey: string;
  input: InputType;
};

// minWidth required on handle to override the default
// The inner div needs the className to be set to behave as part of the handle
// The hover effect is in the css file
export const RowHandle = ({
  handleKey,
  input,
}: RowHandleProps) => {
  const isInput = input === InputType.Ingredient;
  return (
    <Box
      className="row-handle"
      position="absolute"
      style={{
        ...(isInput ? { left: 0 } : { right: 0 }),
        top: "calc(50% + 1px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          position: "absolute",
          backgroundColor: "grey",
          width: 6,
          height: 6,
          borderRadius: "50%",
          border: "1px solid lightgrey",
        }}
      />
      
      <Handle
        id={handleKey}
        type={input === InputType.Ingredient ? "target" : "source" }
        position={input === InputType.Ingredient ? Position.Left : Position.Right}
        style={{
          opacity: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 1,
          width: 1,
        }}
        isConnectable
      >
        <div 
          className={input === InputType.Ingredient ? "target" : "source" }
          style={{
            ...(input === InputType.Ingredient ? { left: "-20px" } : { right: "-20px" }),
            position: "absolute",
            backgroundColor: "lightblue",
            opacity: 0.5,
            top: -18,
            height: 39,
            width: 120,
          }}
        />
      </Handle>
    </Box>
  );
}