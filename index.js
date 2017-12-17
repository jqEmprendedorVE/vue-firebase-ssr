const server = require('express')()
const path = require('path')
const createApp = require(path.join(__dirname, '/src/app.js'))
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
  const context = {
    title: 'Vue - SSR',
    meta: `
    <meta charset="utf-8"> 
    <meta name="Description" content="Vue en SSR">`,
    url: req.url
  }
  const app = createApp(context)

  renderer.renderToString(app, context, (err, html) => {
    res.end(html)
  })
})

server.listen(8080)