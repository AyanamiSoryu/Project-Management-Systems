import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve('./dist/'),
    filename: "main.js",
    clean: true,
    publicPath: "/"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve('./dist/'),
    port: 3000,
    open: false,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ],
  mode: "development"
};
