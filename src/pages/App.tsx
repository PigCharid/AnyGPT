import Home from "./Home";
import Navbar from "./Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Projects from "./Projects";
import "@arco-design/web-react/dist/css/arco.css";
import LogoinModal from "../components/LoginModal";
import CreateProjectModal from "../components/CreateProjectChoiceModal/CreateProjectModal";
import CreateProjectChoiceModal from "../components/CreateProjectChoiceModal";
import { modalStore } from "../store";
import { useEffect } from "react";
import AICenter from "./AICenter";
import AIChat from "./AIChat";
import Integral from "./Integral";
const App = () => {
  const location = useLocation();
  const { isActive, setIsActive } = modalStore();
  useEffect(() => {
    if (isActive === undefined) {
      setIsActive(location.pathname);
    }
  });
  console.log(isActive);
  return (
    <div className="text-white">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/"></Route>
        {/* <Route element={<Projects />} path="/projects"></Route> */}
        <Route element={<Integral />} path="/integral"></Route>
        <Route element={<AICenter />} path="/aicenter"></Route>
        <Route element={<AIChat />} path="/aicenter/aichat"></Route>
      </Routes>
      <LogoinModal />
      <CreateProjectChoiceModal />
      <CreateProjectModal />
    </div>
  );
};

export default App;
