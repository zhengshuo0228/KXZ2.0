import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerPush } from "./utils/push";

// 初始化推送通知
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    await registerPush();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
