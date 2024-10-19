const path = require('path');
const CopyPlugin = require('copy-webpack-plugin'); // Import CopyPlugin

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
        patterns: [
            { from: 'manifest.json', to: 'manifest.json' }, // Adjust the path as needed
            // Add other files to copy if needed (e.g., images, HTML files)
        ],
    }),
  ],
  mode: 'development',
  devServer: {
    static: './dist',
    port: 3001,
    open: true, // Automatically open the browser
    hot: true,  // Enable hot module replacement
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/, // Add this rule to handle .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve .js and .jsx extensions
  },
};
