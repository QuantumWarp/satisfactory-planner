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

      <RowHandle handleKey={title} input={input} />
    </Box>
  );
}