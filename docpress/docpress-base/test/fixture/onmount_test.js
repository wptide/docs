'use strict'

const fixture = require('../support/fixture')
const buildMs = require('../support/build_ms')

describe('fixture/onmount:', function () {
  let fx = fixture('onmount')
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

    it('doesn\'t output extra css', function () {
      // old bug
      expect(data).toExclude('<link rel="stylesheet">')
    })

    it('highlights current menu item', function () {
      expect(data).toMatch(/-active[^>]+>onmount/)
    })

    it('adds "link-slug" classes', function () {
      expect(data).toMatch(/link-index[^>]+>onmount/)
    })

    it('adds hash to assets', function () {
      expect(data).toMatch(/script\.js\?t=[a-f0-9]{8}/)
      expect(data).toMatch(/style\.css\?t=[a-f0-9]{8}/)
    })
  })

  describe('style.css', function () {
    before(function () {
      data = fx.read('_docpress/assets/style.css')
    })

    it('works', function () {
      expect(data).toInclude('.markdown-body')
      expect(data).toInclude('.toc-menu')
    })
  })

  describe('script.js', function () {
    before(function () {
      data = fx.read('_docpress/assets/script.js')
    })

    it('works', function () {
      expect(data).toInclude('Pjax')
      expect(data).toInclude('pjax:complete')
      expect(data).toInclude('Nprogress')
    })

    it.skip('renders custom js', function () {
      expect(data).toInclude('/* custom */')
    }) })
})
