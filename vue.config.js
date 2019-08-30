const path = require('path')

// DIR example: './pages/init'
const { DIR } = process.env

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 关闭线上代码的错误提示
  productionSourceMap: false,
  // 将lint报错显示在浏览器上
  lintOnSave: 'error',
  // 输出配置
  outputDir: `dist/${path.basename(DIR)}`,
  // 页面配置
  pages: {
    index: {
      entry: `${DIR}/src/main.ts`,
      template: `${DIR}/index.html`,
      filename: 'index.html', // build后的模板名
    },
  },
  // 别名配置
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.styl', '.css'],
      alias: {
        '@': resolve(`${DIR}/src`),
        '~': resolve('common'),
        '~components': resolve('common/components'),
        '~js': resolve('common/js'),
        '~css': resolve('common/css'),
        '~img': resolve('common/img'),
      },
    },
  },
}
