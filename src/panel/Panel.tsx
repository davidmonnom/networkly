import { createRoot } from "react-dom/client";
import { RequestList } from "./components/RequestList";

import "../style/bootstrap.min.css";
import "../style/bootstrap.override.css";
import "../style/checkbox.css";
import "../style/global.css";
import "../style/panel.css";
import "../style/json_tree.css";

export type NetworkRequest = chrome.devtools.network.Request;
export enum RequestType {
  Document = "document",
  Stylesheet = "stylesheet",
  Image = "image",
  Media = "media",
  Font = "font",
  Script = "script",
  TextTrack = "texttrack",
  XHR = "xhr",
  Fetch = "fetch",
  Prefetch = "prefetch",
  EventSource = "eventsource",
  WebSocket = "websocket",
  WebTransport = "webtransport",
  Wasm = "wasm",
  Manifest = "manifest",
  SignedExchange = "signed-exchange",
  Ping = "ping",
  CspViolationReport = "csp-violation-report",
  Other = "other",
  Preflight = "preflight",
  SmScript = "sm-script",
  SmStylesheet = "sm-stylesheet",
  WebBundle = "webbundle",
}

document.addEventListener("DOMContentLoaded", function () {
  const root = createRoot(document.getElementById("app") as HTMLElement);
  root.render(<RequestList />);
});
