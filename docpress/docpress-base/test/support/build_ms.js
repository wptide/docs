module.exports = function buildMs (metalsmithJs, options) {
  before(function (done) {
    this.app = require(metalsmithJs)
    this.app.build((err) => {
      if (options && options.catchErr) {
        this.err = err
        return done()
      } else if (err) {
        return done(err)
      }
      done()
    })
  })
}
