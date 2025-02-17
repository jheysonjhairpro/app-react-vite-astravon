import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AudioProvider } from "./hooks/AudioContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AudioProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AudioProvider>
);
