import { Checkbox, ListItemText, Menu, MenuItem, useColorScheme, useMediaQuery } from "@mui/material";
import { useFactory } from "../context/FactoryUse";

type SettingsMenuProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export function SettingsMenu({ anchorEl, onClose }: SettingsMenuProps) {
  const { alternates, ficsmas, setFicsmas, setAlternates } = useFactory();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { mode, setMode, systemMode } = useColorScheme();
  const color = mode === "system" ? systemMode : mode;

  const toggleDarkMode = () => {
    const nextColor = color !== 'dark' ? 'dark' : 'light';
    const nextMode = (prefersDarkMode && nextColor === "dark") ? "system" : nextColor;
    setMode(nextMode);
  };

  return (
    <Menu
      sx={{ mt: 1 }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem sx={{ width: 200 }} onClick={() => setFicsmas(!ficsmas)}>
        <Checkbox checked={ficsmas} />
        <ListItemText>
          Ficsmas
        </ListItemText>
      </MenuItem>

      <MenuItem sx={{ width: 200 }} onClick={() => setAlternates(!alternates)}>
        <Checkbox checked={alternates} />
        <ListItemText>
          Alternates
        </ListItemText>
      </MenuItem>

      <MenuItem sx={{ width: 200 }} onClick={toggleDarkMode}>
        <Checkbox checked={color === "dark"} />
        <ListItemText>
          Dark Mode
        </ListItemText>
      </MenuItem>
    </Menu>
  )
}
