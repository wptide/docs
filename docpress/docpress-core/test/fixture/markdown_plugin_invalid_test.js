'use strict'

const fixture = require('../support/fixture')

describe('fixture/markdown plugin invalid:', function () {
  let app

  let fx = fixture('markdown-plugin-invalid')

  before(function (done) {
    app = require(fx.path('metalsmith.js'))
    app.build((err, files) => {
      this.files = files
      if (err) this.err = err
      done()
    })
  })

  it('fails', function () {
    expect(this.err).toExist()
    expect(this.err.message).toEqual("Can't find module 'markdown-it-lalalala'")
  })
})
