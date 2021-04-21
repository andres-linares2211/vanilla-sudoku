const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [path.resolve(__dirname, 'src/index.ts'), path.resolve(__dirname, 'styles/index.scss')],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(scss|css)$/,
        include: [path.resolve(__dirname, 'styles')],
        use: [
          { loader: 'file-loader', options: { outputPath: 'styles/', name: '[name].css' } },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
