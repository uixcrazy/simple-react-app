const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const IgnoreNotFoundExportPlugin = require("ignore-not-found-export-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const packagesPath = [__dirname, "..", "..", "packages"];

module.exports = {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HardSourceWebpackPlugin(),
    // required because of https://github.com/babel/babel/issues/7640
    new IgnoreNotFoundExportPlugin([
      "CallbackSideEffect",
      "ChoicesProps",
      "InputProps",
      "NotificationSideEffect",
      "OptionText",
      "OptionTextElement",
      "RedirectionSideEffect",
      "RefreshSideEffect",
      "AdminUIProps",
      "AdminContextProps",
      "AdminRouterProps",
      "ReferenceArrayProps",
      "ReferenceManyProps",
      "LinkToType",
      "FormContext",
      "UseReferenceProps",
      "SortProps",
      "PaginationProps",
      "CreateControllerProps",
      "EditControllerProps",
      "ShowControllerProps",
      "ListControllerProps",
    ]),
  ].concat(
    process.env.NODE_ENV === "development" ? [new BundleAnalyzerPlugin()] : []
  ),
  resolve:
    process.env.USE_ALIAS === "true"
      ? {
          extensions: [".ts", ".js", ".tsx", ".json"],
          alias: {
            "my-i18n": path.join(...packagesPath, "i18n", "src"),
          },
        }
      : {},
  devServer: {
    stats: {
      children: false,
      chunks: false,
      modules: false,
    },
  },
};
