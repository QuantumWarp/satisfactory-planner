import { AppBar, Box, Button, Tooltip, Typography } from "@mui/material";
import { Add, Delete, FactoryOutlined, FolderOpen, Save, Settings } from "@mui/icons-material";
import { useState } from "react";
import { useFactory } from "../context/FactoryUse";
import { SettingsMenu } from "./SettingsMenu";
import { LoadMenu } from "./LoadMenu";
import { EditFactoryDialog } from "../dialogs/EditFactoryDialog";
import { ConfirmationDialog } from "../dialogs/ConfirmationDialog";

export function TopBar() {
  const { factory, create, remove, load } = useFactory();

  const [settingsOpen, setSettingsOpen] = useState<HTMLElement | null>(null);
  const [loadOpen, setLoadOpen] = useState<HTMLElement | null>(null);
  const [editNameOpen, setEditNameOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [unsavedCreateOpen, setUnsavedCreateOpen] = useState<boolean>(false);
  const [unsavedLoadOpen, setUnsavedLoadOpen] = useState<string>();

  const isUnsaved = !factory.id;

  return (
    <AppBar position="absolute" color="default">
      <Box display="flex" alignItems="stretch">
        <Box display="flex" alignItems="center" mx={3}>
          <FactoryOutlined fontSize="large" />
        </Box>

        <Typography variant="h4" py={2}>
          Satisfactory Planner
        </Typography>
        
        <Box marginLeft="auto" display="flex" alignItems="stretch">
          <Tooltip title="New Factory">
            <Box display="flex" alignItems="stretch">
              <Button
                disabled={!factory.id && factory.nodes.length === 0}
                onClick={() => {
                  if (isUnsaved) setUnsavedCreateOpen(true)
                  else create();
                }}
              >
                <Add />
              </Button>
            </Box>
          </Tooltip>

          <Tooltip title={isUnsaved ? "Save Factory" : "Saved Automatically"}>
            <Box display="flex" alignItems="stretch">
              <Button disabled={!isUnsaved} onClick={() => setEditNameOpen(true)}>
                <Save />
              </Button>
            </Box>
          </Tooltip>

          <Tooltip title={isUnsaved ? "Unsaved" : "Delete Factory"}>
            <Box display="flex" alignItems="stretch">
              <Button disabled={isUnsaved} onClick={() => setDeleteOpen(true)} color="error">
                <Delete />
              </Button>
              </Box>
          </Tooltip>

          <Tooltip title="Load Factory">
            <Button onClick={(e) => setLoadOpen(e.currentTarget)}>
              <FolderOpen />
            </Button>
          </Tooltip>

          <Tooltip title="Settings">
            <Button onClick={(e) => setSettingsOpen(e.currentTarget)}>
              <Settings />
            </Button>
          </Tooltip>
        </Box>
      </Box>

      <LoadMenu
        anchorEl={loadOpen}
        onConfirm={(id) => {
          if (id) {
            if (isUnsaved) setUnsavedLoadOpen(id);
            else load(id);
          } else {
            if (isUnsaved) setUnsavedCreateOpen(true);
            else create();
          }
        }}
        onClose={() => setLoadOpen(null)}
      />

      <SettingsMenu
        anchorEl={settingsOpen}
        onClose={() => setSettingsOpen(null)}
      />

      <EditFactoryDialog
        open={editNameOpen}
        onClose={() => setEditNameOpen(false)}
      />

      <ConfirmationDialog
        title="Delete Factory"
        action="Delete"
        open={deleteOpen}
        onConfirm={remove}
        onClose={() => setDeleteOpen(false)}
      >
        Are you sure you want to delete <b>{factory.name}</b>?
      </ConfirmationDialog>

      <ConfirmationDialog
        title="Unsaved Factory"
        action="Continue"
        open={unsavedCreateOpen}
        onConfirm={create}
        onClose={() => setUnsavedCreateOpen(false)}
      >
        Are you sure you want to create a new factory?
        You will lose this current unsaved factory.
      </ConfirmationDialog>

      <ConfirmationDialog
        title="Unsaved Factory"
        action="Continue"
        open={Boolean(unsavedLoadOpen)}
        onConfirm={() => unsavedLoadOpen && load(unsavedLoadOpen)}
        onClose={() => setUnsavedLoadOpen(undefined)}
      >
        Are you sure you want to load this factory?
        You will lose this current unsaved factory.
      </ConfirmationDialog>
    </AppBar>
  )
}