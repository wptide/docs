'use strict'

const fixture = require('../support/fixture')
const buildMs = require('../support/build_ms')

describe('fixture/google-analytics:', function () {
  let fx = fixture('google-analytics')
  buildMs(fx.path('metalsmith.js'))

  describe('index.html', function () {
    before(function () {
      this.data = fx.read('_docpress/index.html')
    })

    it('adds the GA isogram', function () {
      expect(this.data).toInclude('function(d,o,c,p,r,e,s)')
    })

    it('adds the tracking ID', function () {
      expect(this.data).toInclude('ga(\'create\',"UA-12345678-1",\'auto\')')
    })
  })
})
