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
          icon: "./src/resources/icons/buildings/Awesome_Shop.png",
          input: InputType.Ingredient
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./src/resources/icons/buildings/Awesome_Shop.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Sink
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { onSelect({
          title: "Power",
          icon: "./src/resources/icons/buildings/Power_Line.png",
          input: InputType.Ingredient
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./src/resources/icons/buildings/Power_Line.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Power
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { onSelect({
          title: "Storage",
          icon: "./src/resources/icons/buildings/Storage_Container.png",
          input: InputType.Both
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./src/resources/icons/buildings/Storage_Container.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          Storage
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { onSelect({
          title: "External",
          icon: "./src/resources/icons/buildings/Train_Station.png",
          input: InputType.Both
        }); onClose(); } }
      >
        <ListItemIcon>
          <img src="./src/resources/icons/buildings/Train_Station.png" height={40} />
        </ListItemIcon>
        <ListItemText sx={{ ml: 2}}>
          External
        </ListItemText>
      </MenuItem>
    </Menu>
  )
}