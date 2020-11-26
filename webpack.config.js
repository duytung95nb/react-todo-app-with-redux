const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function (env) {
  const my_env = (typeof env == 'object' && ["development", "production"].includes(env.NODE_ENV)) ? env.NODE_ENV : 'none';
  console.log('env.NODE_ENV: ' + my_env);

  return {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
        './src/index.jsx'
    ],
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
          resolve: {
            extensions: [".js", ".jsx"]
          }
        }, {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "eslint-loader",
            options: {
              failOnError: true,
              quiet: true,
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            // Creates `style` nodes from JS strings
            { loader: 'style-loader', options: { injectType: 'styleTag' } },
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(svg|png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        /* enable this when use html loader lo load template/html resource
          {
            test: /src\\tmpl\\.*\.(hbs|html)$/i,
            loader: 'html-loader',
          },
        */
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Production',
        template: 'index.html'
     }),
    ],
  }
};
