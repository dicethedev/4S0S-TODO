import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoGet from "./pages/todoGet";

function App() {
  
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getTodos" element={<TodoGet />} />
      </Routes>
     </Router>
  );
}

export default App;