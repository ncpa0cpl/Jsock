const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
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
