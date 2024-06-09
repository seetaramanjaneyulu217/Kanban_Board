import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import KanbanBoard from "./pages/KanbanBoard";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/kanban-board" element={<KanbanBoard />} />
      </Routes>
    </>
  );
}

export default App;
