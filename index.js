const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const Koa = require('koa')
const router = require('koa-router')()
const koaStatic = require('koa-static')

const readFile = promisify(fs.readFile)

const app = new Koa()

app.use(koaStatic('dist'))

function delay (args, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(args)
    }, time)
  })
}
function getTime () {
  const date = new Date()
  return date.getMinutes() + ':' + date.getSeconds()
}

router.get('/api/:handler', async function (ctx) {
  ctx.body = await delay({
    name: ctx.params.handler,
    time: getTime()
  }, 2000)
})

router.get('/', async function (ctx) {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = await readFile(path.join(__dirname, 'index.html'))
}).get('/index.html', async function (ctx) {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = await readFile(path.join(__dirname, 'index.html'))
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
