import Home from "./Home";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import "@arco-design/web-react/dist/css/arco.css";
import LogoinModal from "../components/LoginModal";
const App = () => {
  return (
    <div className="text-white">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Projects />} path="/projects"></Route>
      </Routes>
      <LogoinModal />
    </div>
  );
};

export default App;
