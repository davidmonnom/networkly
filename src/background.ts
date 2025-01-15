import hljs from "highlight.js";

chrome.runtime.onMessage.addListener((message) => {
  const result = hljs.highlight(message.language, message.code);
  chrome.runtime.sendMessage(result.value);
});
