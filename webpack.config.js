module.exports = {
  entry: "./frontend/App.jsx",
  output: {
    path: "./frontend/bundle",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
          //transpiling & compilation
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file'
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
