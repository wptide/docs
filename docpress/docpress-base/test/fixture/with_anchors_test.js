'use strict'

const fixture = require('../support/fixture')
const buildMs = require('../support/build_ms')

describe('fixture/with anchors:', function () {
  let fx = fixture('with-anchors')
  buildMs(fx.path('metalsmith.js'))
  let data

  describe('index.html', function () {
    before(function () {
      data = fx.read('_docpress/index.html').toLowerCase()
    })

    it('renders as html', function () {
      expect(data).toInclude('<!doctype html>')
      expect(data).toInclude('markdown-body')
      expect(data).toInclude('toc-menu')
      expect(data).toInclude('body page-index') // slug
    })

    it('links to anchored versions', function () {
      expect(data).toInclude('<a class="link title  link-index-2" href="index.html#two">intro 2</a>')
    })
  })
})
