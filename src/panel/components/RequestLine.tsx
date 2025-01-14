import { RequestType } from "../Panel";
import { Requests } from "./RequestList";

interface RequestLineProps {
  request: Requests;
  isSelected: boolean;
  onClick: (request: Requests) => void;
}

export function RequestLine(props: RequestLineProps) {
  const request = props.request.request;
  const status = request.response.status;

  const getMimeTypeColorString = () => {
    let name = "";
    let color = "";

    switch (request._resourceType) {
      case RequestType.Fetch:
        color = "#ff6c6c";
        name = "FETCH";
        break;
      case RequestType.XHR:
        color = "#ff6c6c";
        name = "XHR";
        break;
      case RequestType.Image:
        color = "#C68AFF";
        name = "IMAGE";
        break;
      case RequestType.Script:
        color = "#FEE237";
        name = "JS";
        break;
      case RequestType.Stylesheet:
        color = "#2E6AF0";
        name = "CSS";
        break;
      case RequestType.Font:
        color = "#FFFFFF";
        name = "FONT";
        break;
      case RequestType.Document:
        color = "#FE7016";
        name = "HTML";
        break;
      default:
        color = "#a4a4a4";
        name = request._resourceType?.toUpperCase() || "OTHER";
        break;
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
