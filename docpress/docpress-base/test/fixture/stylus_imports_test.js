'use strict'

const fixture = require('../support/fixture')
const buildMs = require('../support/build_ms')

describe('fixture/stylus-imports:', function () {
  let fx = fixture('stylus-imports')
  buildMs(fx.path('metalsmith.js'))

  describe('assets/style.css', function () {
    before(function () {
      this.data = fx.read('_docpress/assets/style.css').toLowerCase()
    })

    it('changes accent color', function () {
      expect(this.data).toInclude('#nprogress .bar {\n  background: #bada55')
    })

    it('renders custom css in', function () {
      expect(this.data).toInclude('#custom {\n  font-family: fira')
    })
  })
})
