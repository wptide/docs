var app = require('docpress-core/ms')(__dirname)
  .use(require('docpress-core')())
  .use(require('../../')())

if (module.parent) {
  module.exports = app
} else {
  app.build(function (err) { if (err) throw err })
}
