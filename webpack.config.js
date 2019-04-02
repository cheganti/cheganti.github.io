var path = require('path');

module.exports = {
   entry: {
      app: './src/main.js'
   },
//    entry: {
//     app: ['whatwg-fetch', './src/main.js']
//    } ,
   output: {
      path: path.resolve(__dirname, 'dev'),
      filename: 'main_bundle.js'
   },
   mode:'development',
   module: {
      rules: [
         {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
            query: {
               presets: ['env']
            }
         }
      ]
   },
//    plugins: [
//     new webpack.ProvidePlugin({ 
//       Promise: 'es6-promise'              // <============ add Promises for IE !!! 
//     }), 
//    ]
};