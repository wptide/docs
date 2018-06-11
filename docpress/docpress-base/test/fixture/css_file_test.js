'use strict'

const fixture = require('../support/fixture')
const buildMs = require('../support/build_ms')

describe('fixture/css-file:', function () {
  let fx = fixture('css-file')
  buildMs(fx.path('metalsmith.js'))

  describe('index.html', function () {
    before(function () {
      this.data = fx.read('_docpress/index.html').toLowerCase()
    })

    it('changes accent color', function () {
      expect(this.data).toMatch(/href="extra.css\?t=[a-f0-9]{8}"/)
    })
  })
})
