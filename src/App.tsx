import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FlowCanvas } from "./components/FlowCanvas";
import { TopBar } from "./components/top-bar/TopBar";
import { ReactFlowProvider } from "@xyflow/react";
import "./App.css";

export function App() {
  const theme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          background: {
            default: '#f0f0f0',
          },
        },
      },
      dark: {
        palette: {
          background: {
            default: '#1b1b1b',
          },
        },
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReactFlowProvider>
        <Box position="relative">
          <TopBar />
          <FlowCanvas />
        </Box>
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
