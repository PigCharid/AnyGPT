import Home from "./Home";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import "@arco-design/web-react/dist/css/arco.css";
import LogoinModal from "../components/LoginModal";
import CreateProjectModal from "../components/CreateProjectChoiceModal/CreateProjectModal";
import CreateProjectChoiceModal from "../components/CreateProjectChoiceModal";
import AIChat from "./AIChat";
const App = () => {
  return (
    <div className="text-white">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Projects />} path="/projects"></Route>
        <Route element={<AIChat />} path="/aichat"></Route>
      </Routes>
      <LogoinModal />
      <CreateProjectChoiceModal />
      <CreateProjectModal />
    </div>
  );
};

export default App;
