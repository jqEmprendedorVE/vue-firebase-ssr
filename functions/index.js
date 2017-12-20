const functions = require('firebase-functions');
const express = require('express')
const LRU = require('lru-cache')
const server = express()
const path = require('path')
const compression = require('compression')
const microcache = require('route-cache')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

// const serverBundle = require(path.join(__dirname,'/dist/vue-ssr-server-bundle.json'))
// const clientManifest = require(path.join(__dirname,'/dist/vue-ssr-client-manifest.json'))

const isProd = true
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const template = require('fs').readFileSync(__dirname + '/index.template.html', 'utf-8')

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
if (isProd) {
  // In production: create server renderer using built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(server, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

/*

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})
 */ 

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

server.use(compression({ threshold: 0 }))
server.use('/dist', serve('./dist', true))
server.use('/public', serve('./public', true))

// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
  max: 100,
  maxAge: 1000
})

const isCacheable = req => useMicroCache

// server.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

function render (req, res) {
  const s = Date.now()

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

  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      if (!isProd) {
        console.log(`cache hit!`)
      }
      return res.end(hit)
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

    res.end(html)
    if (cacheable) {
      microCache.set(req.url, html)
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

server.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

if (isProd) {
  var ssrapp = exports.ssrapp = functions.https.onRequest(server);
} else {
  const port = process.env.PORT || 8080
  server.listen(port, () => {
    console.log(`server started at localhost:${port}`)
  })
}

// server.listen(8080)