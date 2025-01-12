type NetworkRequest = chrome.devtools.network.Request;

interface Window {
  INITIAL_DATA?: NetworkRequest[];
}

const reqs: NetworkRequest[] = [];

chrome.devtools.panels.create("Networkly", "", "panel/index.html", (panel) => {
  const reqs = [] as NetworkRequest[];
  const network = chrome.devtools.network;

  const requestHandler = (request: NetworkRequest) => {
    reqs.push(request);
  };

  network.onRequestFinished.addListener(requestHandler);
  panel.onShown.addListener(function onShown(window) {
    panel.onShown.removeListener(onShown);
    window.INITIAL_DATA = reqs;
    network.onRequestFinished.removeListener(requestHandler);
  });
});
