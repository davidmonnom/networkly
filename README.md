[![Node.js CI](https://github.com/davidmonnom/networkly/actions/workflows/node.js.yml/badge.svg)](https://github.com/davidmonnom/networkly/actions/workflows/node.js.yml)

## Networkly - Simple network inspector

Chrome extension to simplify network request inspection. This application focuses on request payloads and responses. It lets you quickly display JSON payloads and responses by directly extending all JSON nodes.

It's a minimalist version of Chrome's network inspection tool. It's designed to be simple and easy to use. It's a great tool for developers who want to quickly inspect network requests and responses.

CSS, HTML and JS files are automatically enhanced and highlighted.

![image](/preview/preview.gif)

### Fonctionnalities

- Display basic request informations
- Request payload and response formatting and beautifying (JSON, JAVASCRIPT, HTML, XML, CSS)
- List of all requests with colored type and status

### Installation

The application will soon be available on the Chrome Store, but for the moment you can install it via source.

1. Clone the repository
2. Install dependencies and build the project
```bash
npm install
npm run build
```
3. Open Chrome and go to `chrome://extensions/`
4. Enable developer mode
5. Click on `Load unpacked` and select the `dist` folder

The application will be available in the Chrome toolbar.

### License

MIT License
