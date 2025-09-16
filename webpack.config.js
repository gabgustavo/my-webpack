const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',          // JS principal (registra tus componentes)
    styles: './src/scss/index.scss',  // SCSS global
    
    'my-button': './src/js/components/scss/my-button.scss',
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].mini.js',
    clean: true
  },
  module: {
    rules: [
      // JS moderno (Web Components)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // SCSS con dos modos: inline (para componentes) y global
      {
        test: /\.scss$/,
        oneOf: [
          // SCSS de componentes (aislados en shadow DOM)
          {
            resourceQuery: /inline/,
            use: [
              'to-string-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          // SCSS global (sale como styles.bundle.css)
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      },

      // CSS plano (global)
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },

      // Si quieres poder importar templates HTML como string
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].mini.css'
    })
  ],
  mode: 'development', // usa 'production' para compilar para producción
  devtool: 'source-map'
};
