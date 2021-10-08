import gulp from 'gulp'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import autoprefixer from 'autoprefixer'
import changed from 'gulp-changed'
import cssnano from 'cssnano'
import postcss from 'gulp-postcss'
import terser from 'gulp-terser'
const sass = require('gulp-sass')(require('sass'))
const webpack = require('webpack-stream')

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  }
}

/*
 * For small tasks you can export arrow functions
 */
// export const clean = () => del([ 'dist' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles () {
  const plugins = [autoprefixer(), cssnano()]
  return (
    gulp
      .src(paths.styles.src)
      .pipe(changed(paths.styles.dest))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(plugins))
      .pipe(
        rename({
          basename: 'bundle',
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(paths.styles.dest))
  )
}

export function scripts () {
  // return gulp.src(paths.scripts.src, { sourcemaps: true })
  return gulp.src(paths.scripts.src)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(babel())
    .pipe(terser())
    .pipe(rename({
      basename: 'bundle',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.scripts.dest))
}
/*
  * You could even use `export as` to rename exported tasks
  */
function watchFiles () {
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.styles.src, styles)
}
export { watchFiles as watch }

// const build = gulp.series(clean, gulp.parallel(styles,scripts));
const build = gulp.series(gulp.parallel(styles, scripts, watchFiles))
/*
 * Export a default task
 */
export default build
