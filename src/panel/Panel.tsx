import { createRoot } from "react-dom/client";
import { RequestList } from "./components/RequestList";

import "../style/bootstrap.min.css";
import "../style/bootstrap.override.css";
import "../style/panel.css";
import "../style/json_tree.css";

export type NetworkRequest = chrome.devtools.network.Request;

document.addEventListener("DOMContentLoaded", function () {
  const root = createRoot(document.getElementById("app") as HTMLElement);
  root.render(<RequestList />);
});
