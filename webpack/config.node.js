const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

const rootDir = path.resolve(__dirname, "./..");
const dist = path.resolve(rootDir, "dist");

module.exports = {
  target: "node",
  entry: path.resolve(rootDir, "./src/index.ts"),
  output: {
    path: path.resolve(dist, "node"),
    filename: "jsock.js",
    publicPath: "/",
    library: "Jsock",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["ts"],
      exclude: ["node_modules", "webpack.config.js", "dist", ".vscode"],
    }),
  ],
};
