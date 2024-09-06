import { Box } from "@mui/material";
import { FlowCanvas } from "./components/FlowCanvas";
import { TopBar } from "./components/top-bar/TopBar";
import { ReactFlowProvider } from "@xyflow/react";

import satisfactoryData from "./resources/satisfactory-data.json";
import { docs } from "./parser/docs.ts";
console.log(JSON.parse(docs).sort((a, b) => a.NativeClass.localeCompare(b.NativeClass)));
console.log(satisfactoryData);


export function App() {

  return (
    <ReactFlowProvider>
      <Box position="relative">
        <TopBar />
        <FlowCanvas />
      </Box>
    </ReactFlowProvider>
  );
}
