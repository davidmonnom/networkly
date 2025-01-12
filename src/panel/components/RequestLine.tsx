import React from "react";
import { Requests } from "./Home";

interface RequestLineProps {
  request: Requests;
  isSelected: boolean;
  onClick: (request: Requests) => void;
}

export function RequestLine(props: RequestLineProps) {
  const request = props.request.request;
  const status = request.response.status;

  const getMimeTypeColorString = () => {
    const mimeType = request.response.content.mimeType;
    let name = "";
    let color = "";

    if (mimeType.includes("image")) {
      color = "#C68AFF";
      name = "IMAGE";
    } else if (mimeType.includes("json")) {
      color = "#73C042";
      name = "JSON";
    } else if (mimeType.includes("html")) {
      color = "#FE7016";
      name = "HTML";
    } else if (mimeType.includes("css")) {
      color = "#2E6AF0";
      name = "CSS";
    } else if (mimeType.includes("javascript")) {
      color = "#FEE237";
      name = "JS";
    } else if (mimeType.includes("xml")) {
      color = "#FEE237";
      name = "XML";
    } else if (mimeType.includes("font")) {
      color = "#FFFFFF";
      name = "FONT";
    } else {
      color = "#4D5057";
      name = "PLAIN";
    }

    return (
      <span style={{ color: color }} className="fw-bold">
        {name}
      </span>
    );
  };

  const getFormattedStatus = () => {
    const status = request.response.status;

    if (status === 0) {
      return "BLOCKED";
    }

    return status;
  };

  const getFormattedUrl = () => {
    const url = request.request.url;

    if (request.request.method === "GET") {
      return url;
    }

    return url.split("/").pop();
  };

  return (
    <tr
      onClick={() => props.onClick(props.request)}
      className={props.isSelected ? "table-active" : ""}
    >
      <td>{request.request.method}</td>
      <td>{getFormattedUrl()}</td>
      <td>{getMimeTypeColorString()}</td>
      <td className={`network-code-${status}`}>{getFormattedStatus()}</td>
      <td>{request.time.toFixed(2)} ms</td>
    </tr>
  );
}
