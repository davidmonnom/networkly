const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  mode: "production",
  entry: {
    app: "./src/app.ts",
    panel: "./src/panel/Panel.tsx",
    background: "./src/background.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: (pathData) => {
      return pathData.chunk.name === "panel" ? "panel/panel.js" : "[name].js";
    },
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: `src/manifest.json`, to: "manifest.json" },
        { from: `src/panel/index.html`, to: "panel/index.html" },
        { from: `src/app.html`, to: "app.html" },
        { from: `src/dialog`, to: "dialog/" },
        { from: `src/libs`, to: "libs/" },
        { from: `src/style`, to: "style/" },
        { from: `src/images`, to: "images/" },
      ],
    }),
  ],
};
