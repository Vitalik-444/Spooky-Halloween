import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { StoreProvider } from "./store";
import App from "./App";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <HashRouter><MotionConfig reducedMotion="user"><StoreProvider><App /></StoreProvider></MotionConfig></HashRouter>
);
