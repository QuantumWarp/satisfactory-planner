import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

type OtherMenuProps = {
  anchorEl: HTMLElement | null;
  onSelect: () => void;
  onClose: () => void;
}

export function OtherMenu({
  anchorEl,
  onSelect,
  onClose
}: OtherMenuProps) {
  return (
    <Menu
      sx={{ mt: 1 }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={onClose}
    >
      <MenuItem
        sx={{ width: 200 }}
        onClick={() => { onSelect(); onClose(); } }
      >
        <ListItemIcon>
          <img src="./src/resources/icons/buildings/Awesome_Shop.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Sink
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { onSelect(); onClose(); } }
      >
        <ListItemIcon>
          <img src="./src/resources/icons/buildings/Power_Line.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Power
        </ListItemText>
      </MenuItem>
    </Menu>
  )
}