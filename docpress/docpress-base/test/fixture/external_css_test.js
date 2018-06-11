'use strict'

const fixture = require('../support/fixture')
const buildMs = require('../support/build_ms')

describe('fixture/external-css:', function () {
  let fx = fixture('external-css')
  buildMs(fx.path('metalsmith.js'))

  describe('index.html', function () {
    before(function () {
      this.data = fx.read('_docpress/index.html').toLowerCase()
    })

    it('renders external css', function () {
      expect(this.data).toInclude(
        '<link rel="stylesheet" href="http://site.com/external.css">')
    })
  })
})
