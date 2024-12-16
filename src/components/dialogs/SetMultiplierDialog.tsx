import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type SetMultiplierDialogProps = {
  open: boolean;
  value: number;
  onChange: (multiplier: number) => void; 
  onClose: () => void;
}

export function SetMultiplierDialog({
  open,
  value,
  onChange,
  onClose,
}: SetMultiplierDialogProps) {
  const [initial, setInitial] = useState(value);
  const [textValue, setTextValue] = useState(value.toString());

  useEffect(() => {
    if (open) return;
    setInitial(value);
    setTextValue(value.toString());
  }, [open, value])

  const update = (newVal: string) => {
    setTextValue(newVal);
    if (!Number(newVal)) return;
    onChange(Number(newVal));
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="Multiplier"
          value={textValue}
          onChange={(e) => update(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {
          onChange(initial);
          onClose();
        }}>
          Cancel
        </Button>

        <Button onClick={onClose}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}