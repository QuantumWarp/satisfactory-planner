import { NodeProps, Node } from '@xyflow/react';
import { InputType } from '../../model/data/enums';
import { Box, Typography } from '@mui/material';
import { RowHandle } from './RowHandle';
import "./node.css";
 
export type OtherNodeProps = {
  title: string;
  icon: string;
  input: InputType;
};
 
export default function OtherNode({ data }: NodeProps<Node<OtherNodeProps>>) {
  const { title, input } = data;
  return (
    <Box
      className="node"
      style={{
        border: "1px solid #151515",
        width: "110px",
        backgroundColor: "#151515",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
      }}
    >
      <Typography color="white" textTransform="uppercase">
        {title}
      </Typography>

      {input === InputType.Ingredient && <RowHandle handleKey={title} input={input} small />}
      {input === InputType.Product && <RowHandle handleKey={title} input={input} small />}
      {input === InputType.Both && (
        <>
          <RowHandle handleKey={title + "1"} input={InputType.Ingredient} small />
          <RowHandle handleKey={title + "2"} input={InputType.Product} small />
        </>
      )}
    </Box>
  );
}