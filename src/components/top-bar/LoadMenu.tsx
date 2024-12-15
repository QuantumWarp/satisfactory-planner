import { ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getFactories } from "../../storage/factory.storage";
import { Factory } from "../../storage/factory";

type LoadMenuProps = {
  anchorEl: HTMLElement | null;
  onConfirm: (id: string) => void;
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
      {factories?.map((x) => (
        <MenuItem
          key={x.id}
          sx={{ width: 200 }}
          onClick={() => {
            if (x.id) onConfirm(x.id);
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
