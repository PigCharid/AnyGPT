import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>加载中....</div>}>
      <App />
    </Suspense>
  </BrowserRouter>
);
