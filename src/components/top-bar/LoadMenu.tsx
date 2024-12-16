import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getFactories } from "../../storage/factory.storage";
import { Factory } from "../../storage/factory";
import { Add } from "@mui/icons-material";

type LoadMenuProps = {
  anchorEl: HTMLElement | null;
  onConfirm: (id?: string) => void;
  onClose: () => void;
}

export function LoadMenu({ anchorEl, onConfirm, onClose }: LoadMenuProps) {
  const [factories, setFactories] = useState<Factory[]>();

  useEffect(() => {
    if (!anchorEl) return;
    setFactories(getFactories());
  }, [anchorEl]);

  return (
    <Menu
      sx={{ mt: 1 }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      {factories?.length === 0 && (
        <MenuItem
          sx={{ width: 200 }}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>
            Create New
          </ListItemText>
        </MenuItem>
      )}

      {factories?.map((x) => (
        <MenuItem
          key={x.id}
          sx={{ width: 200 }}
          onClick={() => {
            onConfirm(x.id);
            onClose();
          }}
        >
          <ListItemText>
            {x.name}
          </ListItemText>
        </MenuItem>
      ))}
    </Menu>
  )
}
