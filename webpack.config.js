module.exports = {
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".css", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    fullySpecified: false,
  },
  rules: [
    {
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
      resolve: {
        fullySpecified: false,
      },
    },
  ],
};
