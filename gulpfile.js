const gulp = require('gulp')
const del = require('del')
const path = require('path')
const runSequence = require('run-sequence')
const swPrecache = require('sw-precache')

gulp.task('default', ['build'])

gulp.task('clean', () => {
  del.sync(['dist'])
})

gulp.task('copy', ['clean'], () => {
  return gulp.src('app/**')
    .pipe(gulp.dest('dist'))
})

gulp.task('service-worker', (cb) => {
  const config = {
    cacheId: 'service-worker-demo',
    runtimeCaching: [{
      urlPattern: /api\/network-only/,
      handler: 'networkOnly',
      options: {
        cache: {
          maxEntries: 10,
          name: 'network-only-cache'
        }
      }
    }, {
      urlPattern: /api\/network-first/,
      handler: 'networkFirst',
      options: {
        cache: {
          maxEntries: 10,
          name: 'network-first-cache'
        }
      }
    }, {
      urlPattern: /api\/cache-first/,
      handler: 'cacheFirst',
      options: {
        cache: {
          maxEntries: 10,
          name: 'cache-first-cache'
        }
      }
    }, {
      urlPattern: /api\/fastest/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 10,
          name: 'fastest-cache'
        }
      }
    }],
    staticFileGlobs: [
      'index.html',
      'dist/**.css',
      'dist/images/**.*',
      'dist/**.js'
    ],
    stripPrefix: 'dist/',
    verbose: true
  }
  swPrecache.write(path.join('dist', 'service-worker.js'), config, cb)
})

gulp.task('build', (callback) => {
  runSequence('copy', 'service-worker', callback)
})
