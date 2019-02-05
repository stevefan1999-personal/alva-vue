const prod = process.env.NODE_ENV === 'production'
const path = require('path')

module.exports = {
  cache: false,
  output: {
    format: prod ? 'cjs' : 'iife',
    target: prod ? 'node' : 'web',
    fileNames: {
      js: !prod ? 'assets/js/[name].[hash:8].js' : 'index.js'
    },
    minimize: !prod
  },
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {}
    }
  ],
  chainWebpack (config, { mode }) {
    if (mode === 'production') {
      config.plugin('declaration').use(require.resolve('dts-bundle-webpack'), [{
        name: ' ',
        main: path.resolve(__dirname, './typings/**/*.d.ts'),
        out: path.resolve(__dirname, './dist/index.d.ts'),
        exclude: /(^index|.*\.vue)\.d\.ts$/,
        outputAsModuleFolder: true
      }]).end()

      config.plugin('copy-types').use(require.resolve('copy-webpack-plugin'), [[
        {
          from: path.resolve(__dirname, './typings/out.d.ts'),
          to: path.resolve(__dirname, './dist/out.d.ts')
        }
      ]]).end()

      config.node.merge({
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
      }).end()

      config.externals([
        require('webpack-node-externals')({
          whitelist: [
            /\.(?!(?:jsx?|json)$).{1,5}$/i,
            /^vue/,
            /^nuxt/
          ]
        }),
        ...(config.get('externals') || [])
      ]).end()

      config.module.rule('ts').use('ts-loader').tap(config => {
        config.transpileOnly = false
        return config
      })
    }

    config.module.rule('vue').test(/\.vue$/).use('vue-loader').tap(config => {
      config.optimizeSSR = false
      return config
    })

    config.resolve.alias
      .set('vue$', require.resolve('vue/dist/vue.esm.js'))
    config
      .plugins
      .delete('fork-ts-cheker')
      .end()

  }
}
