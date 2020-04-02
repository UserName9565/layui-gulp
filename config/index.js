const path = require('path')
const server = require('./server')

function resolveDev(dir) {
  return path.join(__dirname, '../src/', dir)
}

function resolveBuild(dir) {
  return path.join(__dirname, '../dist/', dir)
}

module.exports = {
  dev: {
    static: './static/**/*',
    html:  [resolveDev('/**/*.html'), '!./src/include/**/*'],
    allhtml: resolveDev('/**/*.html'),
    styles: resolveDev('static/css/**/*.{scss,css}'),
    script: resolveDev('static/js/**/*'),
    images: resolveDev('static/images/**/*.{png,jpg,gif,svg}'),
    layer: resolveDev('static/layui/**/*')
  },

  build: {
    static: resolveBuild('static'),
    html: resolveBuild(''),
    styles: resolveBuild('static/css'),
    script: resolveBuild('static/js'),
    images: resolveBuild('static/images'),
    layer: resolveBuild('static/layui')
  },

  zip: {
    name: 'gulpProject.zip',
    path: resolveBuild('**/*'),
    dest: path.join(__dirname, '../')
  },

  server,
  useEslint: false,
  useWebpack: false,
  productionZip: false
}
