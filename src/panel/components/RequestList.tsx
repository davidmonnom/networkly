import { useEffect, useState } from "react";
import { NetworkRequest, RequestType } from "../Panel";
import { RequestLine } from "./RequestLine";
import { RequestView } from "./RequestView";
import { CustomCheckbox } from "./CustomCheckbox";

export interface Requests {
  request: NetworkRequest;
  content: string | null;
}

export const RequestList = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Requests | null>(null);
  const [type, setType] = useState<RequestType | null>(null);

  const onClose = () => {
    setSelectedRequest(null);
  };

  const onClickLine = (request: Requests) => {
    setSelectedRequest(request);
  };

  const onChangeType = (type: RequestType | null) => {
    setSelectedRequest(null);
    setType(type);
  };

  const handleRequest = (request: NetworkRequest) => {
    request.getContent((content: string | null) => {
      setRequests((requests) => {
        return [
          ...requests,
          {
            request,
            content,
          },
        ];
      });
    });
  };

  const getFilteredRequests = () => {
    return requests.filter((request) => {
      if (type === null) {
        return true;
      }

      if (type === RequestType.Fetch) {
        return (
          request.request._resourceType === RequestType.Fetch ||
          request.request._resourceType === RequestType.XHR
        );
      }

      return request.request._resourceType === type;
    });
  };

  useEffect(() => {
    window.INITIAL_DATA?.forEach(handleRequest);
    chrome.devtools.network.onRequestFinished.addListener(handleRequest);
    chrome.devtools.network.onNavigated.addListener(() => {
      setRequests([]);
      setSelectedRequest(null);
    });
  }, []);

  return (
    <div className="vh-100 d-flex flex-column w-100">
      <div className="w-100 bg-primary text-white">
        <div className="d-flex align-items-center custom-checkbox p-1 gap-1">
          <CustomCheckbox
            label="All"
            callback={() => onChangeType(null)}
            active={type === null}
          />
          <CustomCheckbox
            label="Fetch/XHR"
            callback={() => onChangeType(RequestType.Fetch)}
            active={type === RequestType.Fetch}
          />
          <CustomCheckbox
            label="HTML"
            callback={() => onChangeType(RequestType.Document)}
            active={type === RequestType.Document}
          />
          <CustomCheckbox
            label="CSS"
            callback={() => onChangeType(RequestType.Stylesheet)}
            active={type === RequestType.Stylesheet}
          />
          <CustomCheckbox
            label="JS"
            callback={() => onChangeType(RequestType.Script)}
            active={type === RequestType.Script}
          />
          <CustomCheckbox
            label="Image"
            callback={() => onChangeType(RequestType.Image)}
            active={type === RequestType.Image}
          />
        </div>
      </div>
      <div className="w-100 flex-grow-1 overflow-scroll">
        <table className="w-100 table table-striped table-hover table-fixed">
          <thead className="resize position-sticky top-0 bg-primary">
            <tr className="bg-primary">
              <th className="position-sticky top-0" scope="col">
                <div>Type</div>
              </th>
              <th className="position-sticky top-0" scope="col">
                <div>URL</div>
              </th>
              <th className="position-sticky top-0" scope="col">
                <div>Type</div>
              </th>
              <th className="position-sticky top-0" scope="col">
                <div>Status</div>
              </th>
              <th className="position-sticky top-0" scope="col">
                <div>Time</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...getFilteredRequests()].reverse().map((request, index) => {
              return (
                <RequestLine
                  key={index}
                  request={request}
                  isSelected={selectedRequest === request}
                  onClick={onClickLine}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedRequest && (
        <div className="w-100 h-75 flex-shrink-0">
          <RequestView request={selectedRequest} onClose={onClose} />
        </div>
      )}
    </div>
  );
};
