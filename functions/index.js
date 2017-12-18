const functions = require('firebase-functions');
const express = require('express')
const server = express()
const path = require('path')
const compression = require('compression')
const microcache = require('route-cache')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync(__dirname + '/index.template.html', 'utf-8')
const serverBundle = require(path.join(__dirname,'/dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.join(__dirname,'/dist/vue-ssr-client-manifest.json'))

const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

server.use(compression({ threshold: 0 }))
server.use('/dist', serve('./dist', true))
server.use('/public', serve('./public', true))

server.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

function render (req, res) {
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue - SSR',
    meta: `
    <meta charset="utf-8"> 
    <meta name="Description" content="Vue en SSR">`,
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }

    res.send(html)
  })
}

server.get('*', render)

var ssrapp = exports.ssrapp = functions.https.onRequest(server);


// server.listen(8080)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
