const config = require('./config')
const filter = require('gulp-filter'); 
const path = require('path')
const chalk = require('chalk')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const htmlmin = require('gulp-htmlmin')
const fileinclude = require('gulp-file-include')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const cleanCSS = require('gulp-clean-css')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const cache  = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const uglify = require('gulp-uglify')
const eslint = require('gulp-eslint')
const stripDebug = require('gulp-strip-debug')
const babel = require('gulp-babel')
const sequence = require('gulp-sequence')
const zip = require('gulp-zip')
const del = require('del')
const minimist = require('minimist')
const rename = require('gulp-rename')
const replace = require('gulp-replace');


// webpack
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

// server
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

// NODE_ENV
const env = process.env.NODE_ENV || 'development'
const condition = env === 'production'

// 默认development环境
var knowOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
}
 
var pathed = '';
var pathed2 = '';
if(env!='build'){
  pathed = "/static"//开发环境根路径
  pathed2 = "/views"
}else{
  pathed = "/bhps/static"//打包环境下根路径
  pathed2 = "/bhps/views"//打包环境下根路径
}
function respath(dir) {
  return path.join(__dirname, './', dir)
}

function onError(error) {
  const title = error.plugin + ' ' + error.name
  const msg = error.message
  const errContent = msg.replace(/\n/g, '\\A ')

  notify.onError({
    title: title,
    message: errContent,
    sound: true
  })(error)

  this.emit('end')
}

function cbTask(task) {
  return new Promise((resolve, reject) => {
    del(respath('dist'))
    .then(paths => {
      console.log(chalk.green(`
      -----------------------------
        Clean tasks are completed
      -----------------------------`))
      sequence(task, () => {
        console.log(chalk.green(`
        -----------------------------
          All tasks are completed
        -----------------------------`))
        resolve('completed')
      })
    })
  })
}

gulp.task('html', () => {
  return gulp.src(config.dev.html)
    .pipe(plumber(onError))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: respath('src/include/')
    }))
    .pipe(gulpif(condition, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(replace('/static', pathed))
    .pipe(replace('/views', pathed2))
    .pipe(gulp.dest(config.build.html))
})

gulp.task('styles', () => {
  return gulp.src(config.dev.styles)
    .pipe(plumber(onError))
    .pipe(sass())
    .pipe(gulpif(condition, cleanCSS({debug: true})))
    .pipe(postcss('./.postcssrc.js'))
    .pipe(gulp.dest(config.build.styles))
})

gulp.task('images', () => {
  return gulp.src(config.dev.images)
    .pipe(plumber(onError))
    .pipe(cache(imagemin({
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    })))
    .pipe(gulp.dest(config.build.images))
})
gulp.task('layer', () => {
  return gulp.src(config.dev.layer)
    .pipe(plumber(onError))
    .pipe(gulp.dest(config.build.layer))
})
gulp.task('eslint', () => {
  return gulp.src(config.dev.script)
   .pipe(plumber(onError))
   .pipe(gulpif(condition, stripDebug()))
   .pipe(eslint({ configFle: './.eslintrc' }))
   .pipe(eslint.format())
   .pipe(eslint.failAfterError());
})

var condition1 = function(f){
 
  if(f.path.indexOf('require.js')!=-1||f.path.indexOf('echarts.js')!=-1){
      return false;
  }
  return true;
};
const useEslint = config.useEslint ? ['eslint'] : [];
gulp.task('script', useEslint, () => {
 
  return gulp.src(config.dev.script)
    .pipe(plumber(onError))
    // .pipe(gulpif(condition, babel({
    //   presets: ['env']
    // })))
    // .pipe(jsFilter)
    .pipe(gulpif(config.useWebpack, webpackStream(webpackConfig, webpack)))
    .pipe(gulpif(condition, uglify()))
    .pipe(replace('/static', pathed))
    .pipe(replace('/views', pathed2))
    // .pipe(jsFilter.restore)
    .pipe(gulp.dest(config.build.script))
})
 

gulp.task('static', () => {
  return gulp.src(config.dev.static)
    .pipe(gulp.dest(config.build.static))
})

gulp.task('clean', () => {
  del('./dist').then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
})

gulp.task('watch', () => {
  gulp.watch(config.dev.allhtml, ['html']).on('change', reload)
  gulp.watch(config.dev.styles, ['styles']).on('change', reload)
  gulp.watch(config.dev.script, ['script']).on('change', reload)
  gulp.watch(config.dev.images, ['images']).on('change', reload)
  gulp.watch(config.dev.static, ['static']).on('change', reload)
  gulp.watch(config.dev.layer, ['layer']).on('change', reload)
})

gulp.task('zip', () => {
  return gulp.src(config.zip.path)
  .pipe(plumber(onError))
  .pipe(zip(config.zip.name))
  .pipe(gulp.dest(config.zip.dest))
})

gulp.task('server', () => {
  const task = ['html', 'styles', 'script', 'images', 'static','layer']
  cbTask(task).then(() => {
    browserSync.init(config.server)
    // console.log(chalk.cyan('  Server complete.\n'))
    gulp.start('watch')
  })
})

gulp.task('build', () => {
  const task = ['html', 'styles', 'script', 'images', 'static','layer', 'env-config']
  cbTask(task).then(() => {
    console.log(chalk.cyan('  Build complete.\n'))

    if (config.productionZip) {
      gulp.start('zip', () => {
        console.log(chalk.cyan('  Zip complete.\n'))
      })
    }
  })
})

var options = minimist(process.argv.slice(2), knowOptions);
var envName = options.env || 'dev';
gulp.task('env-config', function() {
    return gulp.src('config/api.config.' + envName + '.js')
        .pipe(rename('api.config.js'))
        .pipe(gulp.dest('./dist/static/js/'));
})

gulp.task('default', () => {
  console.log(chalk.green(
   `
  Build Setup
    开发环境： npm run dev
    生产环境： npm run build
    执行压缩： gulp zip
    编译页面： gulp html
    编译脚本： gulp script
    编译样式： gulp styles
    语法检测： gulp eslint
    压缩图片： gulp images
    `
  ))
})
