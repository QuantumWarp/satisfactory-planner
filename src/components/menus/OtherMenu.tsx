import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { OtherNodeProps } from "../nodes/OtherNode";
import { InputType } from "../../model/data/enums";

type OtherMenuProps = {
  anchorEl: HTMLElement | null;
  onSelect: (props: OtherNodeProps) => void;
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
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
    >
      <MenuItem
        sx={{ width: 200 }}
        onClick={() => { onSelect({
          title: "Sink",
          icon: "./other/AWESOME_Shop.png",
          input: InputType.Ingredient
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./other/AWESOME_Shop.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Sink
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { onSelect({
          title: "Power",
          icon: "./other/Power_Line.png",
          input: InputType.Ingredient
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./other/Power_Line.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Power
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { onSelect({
          title: "Storage",
          icon: "./other/Storage_Container.png",
          input: InputType.Both
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./other/Storage_Container.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Storage
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { onSelect({
          title: "External",
          icon: "./other/Train_Station.png",
          input: InputType.Both
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./other/Train_Station.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          External
        </ListItemText>
      </MenuItem>
    </Menu>
  )
}