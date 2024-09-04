import { FlowCanvas } from "./components/FlowCanvas";
import satisfactoryData from "./resources/satisfactory-data.json";

export function App() {
  console.log(satisfactoryData);

  return (
    <FlowCanvas />
  );
}
