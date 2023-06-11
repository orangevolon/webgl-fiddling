const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./public",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name].[ext]",
              outputPath: "images",
              publicPath: "images/",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.glsl/i,
        use: ["raw-loader"],
      },
    ],
  },
};
