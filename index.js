const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
  const context = {
    title: 'Vue - SSR',
    meta: `
    <meta charset="utf-8"> 
    <meta name="Description" content="Vue en SSR">`
  }
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`
  })

  renderer.renderToString(app, context, (err, html) => {
    res.end(html)
  })
})

server.listen(8080)