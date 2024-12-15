import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useFactory } from "../context/FactoryUse";
import { useEffect, useState } from "react";

type EditFactoryDialogProps = {
  open: boolean;
  onClose: () => void;
}

export function EditFactoryDialog({ open, onClose }: EditFactoryDialogProps) {
  const { factory, setName } = useFactory();
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    setNewName(factory.name);
  }, [factory.name, open])

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="Name"
          placeholder="New Factory"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={() => {
          setName(newName);
          onClose();
        }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}