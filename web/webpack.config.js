/* eslint-disable @typescript-eslint/no-var-requires */
// Webpack config that runs the Nyxo React Native app in a browser through
// react-native-web. Native-only modules are swapped for the shims in ./shims,
// and the demo wrapper in ./DemoAppWrapper.tsx seeds sample data.
//
//   yarn web        -> dev server on http://localhost:8080
//   yarn web:build  -> static build in web/dist

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const root = path.resolve(__dirname, '..')
const src = (p) => path.resolve(root, 'src', p)
const shim = (p) => path.resolve(__dirname, 'shims', p)

// Packages in node_modules that ship untranspiled JSX / Flow / TypeScript.
const transpileModules = [
  'react-native-',
  '@react-native-community',
  '@react-native-async-storage',
  '@react-navigation',
  'react-native-reanimated',
  'react-native-redash',
  'react-native-svg',
  'react-native-screens',
  'react-native-safe-area-context',
  'react-native-gesture-handler',
  'react-native-modal',
  'react-native-animatable',
  'react-native-calendars',
  'react-native-circular-progress',
  'react-native-iphone-x-helper',
  'react-native-status-bar-height',
  'react-native-web-linear-gradient'
]

// The source imports some files with different casing than on disk
// (e.g. '@config/config' -> src/config/Config.ts). macOS forgives that, Linux
// does not, so fall back to a case-insensitive lookup when a request fails.
class CaseInsensitiveResolvePlugin {
  apply(resolver) {
    const target = resolver.ensureHook('resolve')
    resolver
      .getHook('raw-file')
      .tapAsync('CaseInsensitiveResolvePlugin', (request, ctx, callback) => {
        const p = request.path
        if (!p || !p.startsWith(path.join(root, 'src'))) return callback()
        const dir = path.dirname(p)
        const base = path.basename(p).toLowerCase()
        let entries
        try {
          entries = fs.readdirSync(dir)
        } catch (e) {
          return callback()
        }
        const match = entries.find(
          (e) =>
            e !== path.basename(p) &&
            (e.toLowerCase() === base ||
              e.replace(/\.(tsx?|jsx?)$/, '').toLowerCase() === base)
        )
        if (!match) return callback()
        return resolver.doResolve(
          target,
          { ...request, request: path.join(dir, match) },
          `case-insensitive match ${match}`,
          ctx,
          callback
        )
      })
  }
}

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production'

  return {
    mode: isDev ? 'development' : 'production',
    context: root,
    entry: path.resolve(__dirname, 'index.js'),
    devtool: isDev ? 'eval-cheap-module-source-map' : false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
      publicPath: ''
    },
    performance: { hints: false },
    optimization: {
      // Escape non-ASCII and control characters (some dependencies embed raw
      // terminal escape codes) so the bundle is plain ASCII text
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: { format: { ascii_only: true } }
        })
      ]
    },
    resolve: {
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.js',
        '.tsx',
        '.ts',
        '.js',
        '.jsx',
        '.json'
      ],
      // react-native-screens and friends point "react-native" at raw source
      mainFields: ['browser', 'module', 'main'],
      plugins: [new CaseInsensitiveResolvePlugin()],
      alias: {
        'react-native$': shim('react-native.js'),
        'css-to-react-native$': shim('css-to-react-native.js'),
        // Coaching progress is kept in the browser instead of Nyxo Cloud
        '@hooks/coaching/useCoaching$': path.resolve(
          __dirname,
          'demo/useCoaching.ts'
        ),

        // Path aliases from babel.config.js / tsconfig.json
        '@actions': src('store/actions'),
        '@assets': path.resolve(root, 'assets'),
        '@reducers': src('store/reducers'),
        '@selectors': src('store/selectors'),
        '@initial-states': src('store/initial-states'),
        '@components': src('components'),
        '@helpers': src('helpers'),
        '@graphql': src('graphql'),
        '@screens': src('screens'),
        '@views': src('views'),
        '@data-fetching': src('data-fetching'),
        '@hooks': src('hooks'),
        '@typings': src('typings'),
        '@types': src('Types'),
        '@store': src('store'),
        '@config': src('config'),
        '@styles': src('styles'),
        '@API': src('API'),
        'persist-queries': src('store/persist-queries'),

        // Native-only modules -> web shims
        'react-native-ultimate-config': shim('ultimate-config.js'),
        'react-native-purchases': shim('purchases.js'),
        'react-native-splash-screen': shim('noop-default.js'),
        '@sentry/react-native': shim('sentry.js'),
        'appcenter-analytics': shim('analytics.js'),
        'appcenter-crashes': shim('noop-default.js'),
        appcenter: shim('noop-default.js'),
        'react-native-localize': shim('localize.js'),
        'react-native-device-info': shim('device-info.js'),
        'react-native-healthkit': shim('healthkit.js'),
        'react-native-keychain': shim('keychain.js'),
        'react-native-app-auth': shim('app-auth.js'),
        'react-native-background-fetch': shim('background-fetch.js'),
        '@react-native-community/push-notification-ios': shim(
          'noop-default.js'
        ),
        '@react-native-community/blur': shim('blur.js'),
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
        'react-native-fast-image': shim('fast-image.js'),
        'react-native-haptic-feedback': shim('haptic-feedback.js'),
        'react-native-rate': shim('rate.js'),
        'expo-web-browser': shim('web-browser.js'),
        'react-native-unimodules': shim('noop-default.js'),
        'react-native-screens/native-stack': shim('native-stack.js'),
        'react-native-gesture-handler$': shim('gesture-handler.js')
      },
      fallback: {
        crypto: false,
        stream: false,
        fs: false,
        path: false,
        os: false,
        buffer: require.resolve('buffer/')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: (file) => {
            const parts = file.split(`node_modules${path.sep}`)
            if (parts.length === 1) return true
            // Only look at the innermost package so nested plain-CJS
            // dependencies (e.g. query-string) are left alone
            const pkg = parts[parts.length - 1]
            return transpileModules.some((m) => pkg.startsWith(m))
          },
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              cacheDirectory: true,
              presets: [
                [
                  'module:metro-react-native-babel-preset',
                  { disableImportExportTransform: true }
                ]
              ],
              plugins: [
                'babel-plugin-styled-components',
                ['babel-plugin-inline-import', { extensions: ['.svg'] }]
              ]
            }
          }
        },
        {
          // Some RN packages ship ESM without file extensions in imports
          test: /\.m?js$/,
          resolve: { fullySpecified: false }
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 4 * 1024 } }
        },
        {
          test: /\.ttf$/i,
          type: 'asset/inline'
        },
        {
          // Cover art for the sample coaching program
          test: /\.svg$/i,
          include: path.resolve(__dirname, 'demo'),
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(isDev),
        'process.env.JEST_WORKER_ID': JSON.stringify(undefined)
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),
      // Render modals inside the phone frame instead of on document.body
      new webpack.NormalModuleReplacementPlugin(
        /^\.\/ModalPortal$/,
        (resource) => {
          const modalDir = /react-native-web[\\/]dist[\\/]exports[\\/]Modal$/
          if (modalDir.test(resource.context)) {
            resource.request = shim('ModalPortal.js')
          }
        }
      ),
      // Tag ScrollViews with data-scrollview for the layout fixes in styles.js
      new webpack.NormalModuleReplacementPlugin(
        /^\.\/ScrollViewBase$/,
        (resource) => {
          const scrollDir = /react-native-web[\\/]dist[\\/]exports[\\/]ScrollView$/
          if (scrollDir.test(resource.context)) {
            resource.request = shim('ScrollViewBase.js')
          }
        }
      ),
      // src/config/Amplify.ts imports the generated (git-ignored) aws-exports
      new webpack.NormalModuleReplacementPlugin(
        /[\\/]aws-exports$/,
        shim('aws-exports.js')
      ),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
        inject: 'body'
      })
    ],
    devServer: {
      static: false,
      port: 8080,
      host: '0.0.0.0',
      historyApiFallback: true,
      hot: false,
      client: { overlay: { warnings: false, errors: true } }
    }
  }
}
