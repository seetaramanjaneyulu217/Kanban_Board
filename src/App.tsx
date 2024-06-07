import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import KanbanBoard from "./pages/KanbanBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/kanban-board" element={<KanbanBoard />} />
    </Routes>
  );
}

export default App;
