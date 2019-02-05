module.exports = function (api) {
  api.cache(false)
  return {
    presets: [
      'poi/babel'
    ],
    plugins: [
      'react-hot-loader/babel'
    ]
  }
}
