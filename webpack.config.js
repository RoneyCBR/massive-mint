var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    // LA LINEA DE AQUI ABAJO ES LA MAS IMPORTANTE!
    // :mindblow: Perdí mas de 2 dias hasta darme cuenta que esta es la linea mas importante de toda esta guia.
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [     
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
          generatorOpts: { compact: false },
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
            plugins: [
              ["relay", { artifactDirectory: "../../__generated__", eagerESModules: true }],
              ["@babel/plugin-transform-runtime"],
            ],
          },
        },
      },
    ],
  },
  externals: {
    // La linea de aqui abajo es solo para indicar que vamos a utilizar la dependencia "React" de parent-testing-project.
    'react': 'commonjs react'
  }
};