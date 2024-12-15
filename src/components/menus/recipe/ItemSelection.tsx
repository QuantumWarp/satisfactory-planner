import { Box, Divider, ListItemIcon, ListItemText, MenuItem, TextField } from "@mui/material";
import { allItems } from "../../../model/data.helper";
import { Item } from "../../../model/data/item";
import { useState } from "react";

type ItemSelectionProps = {
  onSelect: (item: Item) => void;
}

export function ItemSelection({
  onSelect
}: ItemSelectionProps) {
  const [search, setSearch] = useState("");
  const items = allItems.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box width={300}>
      <Box px={2} mb={1}>
        <TextField
          hiddenLabel
          fullWidth
          size="small"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Items"
        />  
      </Box>

      <Divider />

      <Box maxHeight={550} sx={{ overflowY: "auto" }}>
        {items.map((item) => {
          return (
            <MenuItem
              key={item.name}
              onClick={() => onSelect(item)}
            >
              <ListItemIcon key={item.key}>
                <img src={item.icon} height={40} />
              </ListItemIcon>
              <ListItemText sx={{ ml: 2}}>
                {item.name}
              </ListItemText>
            </MenuItem>
          )
        })}
      </Box>
    </Box>
  )
}