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

firebase url for downloading https://firebasestorage.googleapis.com/v0/b/neighboorhood-map-211813.appspot.com/o/places.json?alt=media&token=9a49ea5d-dea0-4b55-9e6b-798a12343e1e
(places.json)
идентификатор клиента 133958429733-cvdtf49rhg0f2ve2qor8d7va3q8i4gcd.apps.googleusercontent.com
секрет вебклиента qagn0Yov61oyvR3WBi7MLFPj
<img src=${image} height = "100" width="100"></img>
onClick={this.showMarkers} 
