import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { allItems } from "../resources/data.helper";

type ItemMenuProps = {
  open: boolean;
}

export function ItemMenu({ open }: ItemMenuProps) {
  return (
    <Menu
      open={open}
    >
      {allItems.map((x) => (
        <MenuItem>
          <ListItemIcon>
            <img src={x.icon} height={40} />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2}}>
            {x.name}
          </ListItemText>
        </MenuItem>
      ))}
    </Menu>
  )
}