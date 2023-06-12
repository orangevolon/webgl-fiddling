const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./public",
  },

  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".glsl"],
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
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
