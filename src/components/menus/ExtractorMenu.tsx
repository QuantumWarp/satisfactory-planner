import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { allItems } from "../../resources/data.helper";

type ExtractorMenuProps = {
  anchorEl: HTMLElement | null;
  onSelect: () => void;
  onClose: () => void;
}

export function ExtractorMenu({
  anchorEl,
  onSelect,
  onClose
}: ExtractorMenuProps) {
  const items = allItems.filter((x) => x.isResource);

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
      {items.map((item) => 
        <MenuItem
          key={item.key} 
          sx={{ width: 200 }}
          onClick={() => { onSelect(); onClose(); } }
        >
          <ListItemIcon>
            <img src={item.icon} height={40} />
          </ListItemIcon>
          <ListItemText sx={{ ml: 2}}>
            {item.name}
          </ListItemText>
        </MenuItem>
      )}
    </Menu>
  )
}