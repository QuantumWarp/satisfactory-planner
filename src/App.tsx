import { Box } from "@mui/material";
import { FlowCanvas } from "./components/FlowCanvas";
import { TopBar } from "./components/top-bar/TopBar";
import { ReactFlowProvider } from "@xyflow/react";

// import satisfactoryData from "./resources/satisfactory-data.json";
// import { docs } from "./parser/docs.ts";
// console.log(JSON.parse(docs).sort((a, b) => a.NativeClass.localeCompare(b.NativeClass)));
// console.log(satisfactoryData);
// console.log(JSON.parse(docs).reduce((a, b) => a.concat(b.Classes.map((x) => ({ ...x, NativeClass: b.NativeClass }))), []).find((x: any) => x.ClassName === "Desc_AlienPowerFuel_C"));

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
