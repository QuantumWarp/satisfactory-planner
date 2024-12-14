import { Menu, MenuItem } from "@mui/material";
import { Edge, useReactFlow } from "@xyflow/react";


type ConnectionMenuProps = {
  anchorEl?: HTMLElement;
  edge?: Edge;
  onClose: () => void;
}

export function ConnectionMenu({ anchorEl, edge, onClose }: ConnectionMenuProps) {
  const { setEdges } = useReactFlow();

  const deleteEdge = () => {
    if (!edge) return;
    setEdges((edges) => edges.filter((x) => x.id !== edge.id));
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={deleteEdge}>Delete</MenuItem>
    </Menu>
  )
}