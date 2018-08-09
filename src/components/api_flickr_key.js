key API Flickr 8eea6e08f3cf6c850184fa8eebf05893

Secret:
503f32d3c226e73f

Edit app details - Edit auth flow for this app - View all Apps by You

https://www.flickr.com/services/api/
{ test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/
    , loader: 'url?limit=100000&name=[name].[ext]'
    } configurate webpack
    

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: (loader) => [
      require('autoprefixer'),
    ]
  }
}

module.exports = function (webpack) {
  return {
    entry: {},
    output: {},
    module: {
      rules: [{
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?-url', postcssLoader, 'less-loader']
        })
      }, {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?-url', postcssLoader, 'stylus-loader?dest=']
        }),
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?-url", postcssLoader, "sass-loader"]
        })
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?-url', postcssLoader]
        }),
      }, {
        test: /\.svg$/,
        use: {
          loader: 'svg-sprite-loader',
          options: {
            name: '[name]',
            prefixize: true
          }
        }
      }]
    },
    plugins: [],
    devServer: {},
    resolve: {
      modules: [
        'node_modules'
      ]
    }
  }
}

инфо окно никак не делала особо. 
клики:
    getInfo = (placeId) => {
        const marker = this.state.markers.find(el => el.id === placeId);
        new window.google.maps.event.trigger(marker, 'click');
    } 

markers - массив с элементами типа window.google.maps.Marker


Людмила, 5:06 PM
 getInfo() дергаю из компонента с фильтром

