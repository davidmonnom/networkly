import React, { useEffect, useState } from "react";
import { Requests } from "./Home";
import beautify from "js-beautify";
import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.css";

interface RequestViewProps {
  request: Requests;
  onClose: () => void;
}

enum Tab {
  Headers,
  Payload,
  Response,
}

export function RequestView(props: RequestViewProps) {
  const request = props.request.request;
  const content = props.request.content;
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Response);

  const getFormattedPayload = () => {
    const payload = document.getElementById("request-payload") as HTMLElement;
    payload.innerHTML = "";

    if (request.request.method === "GET") {
      const obj = request.request.queryString;
      const tree = jsonTree.create(obj, payload);
      tree.expand();
      return;
    }

    try {
      const obj = JSON.parse(request.request.postData?.text || "{}");
      const tree = jsonTree.create(obj, payload);
      tree.expand();
    } catch (error) {
      payload.innerHTML = "";
    }
  };

  const formatImageContent = (
    content: string,
    mimeType: string,
    response: HTMLElement
  ) => {
    const img = document.createElement("img");
    img.className = "img-fluid mw-100";
    img.src = `data:${mimeType};base64,${content}`;
    response.appendChild(img);
  };

  const formatJsonContent = (content: string, response: HTMLElement) => {
    const object = JSON.parse(content);
    const tree = jsonTree.create(object, response);
    tree.expand();
  };

  const formatHtmlContent = (content: string, response: HTMLElement) => {
    const beautified = beautify.html_beautify(content, { indent_size: 2 });
    response.innerHTML = `<pre><code class='language-xml'>${beautified}</code></pre>`;
  };

  const formatCssContent = (content: string, response: HTMLElement) => {
    const beautified = beautify.css_beautify(content, { indent_size: 2 });
    response.innerHTML = `<pre><code class="language-css">${beautified}</code></pre>`;
  };

  const formatJsContent = (content: string, response: HTMLElement) => {
    const beautified = beautify.js_beautify(content, { indent_size: 2 });
    response.innerHTML = `<pre><code class="language-javascript">${beautified}</code></pre>`;
  };

  const formatXmlContent = (content: string, response: HTMLElement) => {
    const beautified = beautify.html_beautify(content, { indent_size: 2 });
    response.innerHTML = `<pre><code class='language-xml'>${beautified}</code></pre>`;
  };

  const formatTextContent = (content: string, response: HTMLElement) => {
    response.innerText = content;
  };

  const getFormattedContent = (content: string | null) => {
    const response = document.getElementById("request-response") as HTMLElement;
    response.innerHTML = "";

    if (!content) {
      response.innerText = "No content";
      return;
    }

    const mimeType = request.response.content.mimeType;

    const formatters: {
      [key: string]: (content: string, response: HTMLElement) => void;
    } = {
      json: formatJsonContent,
      html: formatHtmlContent,
      css: formatCssContent,
      javascript: formatJsContent,
      xml: formatXmlContent,
      font: formatTextContent,
      default: formatTextContent,
      image: (content, response) =>
        formatImageContent(content, mimeType, response),
    };

    try {
      const formatter =
        Object.keys(formatters).find((key) => mimeType.includes(key)) ||
        "default";
      formatters[formatter](content, response);
      hljs.highlightAll();
    } catch (error) {
      response.innerText = content;
    }
  };

  useEffect(() => {
    getFormattedPayload();
    getFormattedContent(content);
  }, [props.request]);

  return (
    <div className="h-100 w-100 d-flex flex-column align-items-start bg-primary">
      <div className="d-flex border align-items-center w-100">
        <div
          onClick={() => setActiveTab(Tab.Headers)}
          className={`button py-1 px-2 border-end cursor-pointer ${
            activeTab === Tab.Headers ? "active" : ""
          }`}
        >
          Request headers
        </div>
        <div
          onClick={() => setActiveTab(Tab.Payload)}
          className={`button py-1 px-2 border-end cursor-pointer ${
            activeTab === Tab.Payload ? "active" : ""
          }`}
        >
          Request payload
        </div>
        <div
          onClick={() => setActiveTab(Tab.Response)}
          className={`button py-1 px-2 border-end cursor-pointer ${
            activeTab === Tab.Response ? "active" : ""
          }`}
        >
          Response body
        </div>
        <div
          className="button ms-auto px-2 cursor-pointer"
          onClick={props.onClose}
        >
          X
        </div>
      </div>
      <div
        id="request-headers"
        className={`flex-grow-1 w-100 border-start border-end border-bottom overflow-scroll ${
          activeTab === Tab.Headers ? "" : "d-none"
        }`}
      >
        <div className="border-bottom py-1 px-3">
          <span className="fw-bold">General</span>
        </div>
        <div className="p-2">
          <div className="d-flex w-100">
            <span className="w-25 flex-shrink-0">URL</span>
            <span className="flex-grow-1">{request.request.url}</span>
          </div>
          <div className="d-flex w-100">
            <span className="w-25 flex-shrink-0">Method</span>
            <span className="flex-grow-1">{request.request.method}</span>
          </div>
          <div className="d-flex w-100">
            <span className="w-25 flex-shrink-0">Status code</span>
            <span className="flex-grow-1">{request.response.status}</span>
          </div>
          <div className="d-flex w-100">
            <span className="w-25 flex-shrink-0">Remote address</span>
            <span className="flex-grow-1">{request.serverIPAddress}</span>
          </div>
        </div>
        <div className="border-bottom border-top py-1 px-3 mt-1">
          <span className="fw-bold">Headers</span>
        </div>
        <div className="p-2">
          {request.request.headers.map((header, index) => (
            <div className="d-flex w-100" key={index}>
              <span className="w-25 flex-shrink-0">{header.name}</span>
              <span className="flex-grow-1">{header.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        id="request-payload"
        className={`flex-grow-1 w-100 border-start border-end border-bottom overflow-scroll ${
          activeTab === Tab.Payload ? "" : "d-none"
        }`}
      ></div>
      <div
        id="request-response"
        className={`flex-grow-1 w-100 border-start border-end border-bottom overflow-scroll ${
          activeTab === Tab.Response ? "" : "d-none"
        }`}
      ></div>
    </div>
  );
}
