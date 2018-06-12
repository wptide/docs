var app = require('docpress-core/ms')(__dirname)
  .use(require('docpress-core')())
  .use(require('../index')())

module.exports = app

if (!module.parent) {
  app.build(function (err) {
    if (err) throw err
    process.exit(0)
  })
}
