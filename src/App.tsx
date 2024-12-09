import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FlowCanvas } from "./components/FlowCanvas";
import { TopBar } from "./components/top-bar/TopBar";
import { ReactFlowProvider } from "@xyflow/react";

// import satisfactoryData from "./resources/data.json";
// import { docs } from "./parser/docs.ts";
// console.log(JSON.parse(docs).sort((a, b) => a.NativeClass.localeCompare(b.NativeClass)));
// console.log(satisfactoryData);
// console.log(JSON.parse(docs).reduce((a, b) => a.concat(b.Classes.map((x) => ({ ...x, NativeClass: b.NativeClass }))), []).find((x: any) => x.ClassName === "Desc_AlienPowerFuel_C"));

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
