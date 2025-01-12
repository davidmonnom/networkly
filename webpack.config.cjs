const webpack = require("webpack");
const path = require("path");
const srcDir = path.join(__dirname, "src");

module.exports = {
  devtool: "inline-source-map",
  mode: "production",
  entry: {
    app: path.join(srcDir, "app.ts"),
    panel: path.join(srcDir, "panel/panel.tsx"),
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
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
  },
};
