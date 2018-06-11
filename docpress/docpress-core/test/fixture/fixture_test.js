'use strict'

const fixture = require('../support/fixture')

describe('fixture', function () {
  let app, data

  let fx = fixture('onmount')

  before(function (done) {
    app = require(fx.path('metalsmith.js'))
    app.build((err, files) => {
      this.files = files
      if (err) return done(err)
      done()
    })
  })

  it('outputs the right files', function () {
    expect(fx.exists('_docpress/index.html')).toEqual(true)
    expect(fx.exists('_docpress/_docpress.json')).toEqual(true)
    expect(fx.exists('_docpress/testing.html')).toEqual(true)
    expect(fx.exists('_docpress/cleanup.html')).toEqual(true)
  })

  it('outputs the right files for plugins', function () {
    expect(this.files['index.html']).toExist()
    expect(this.files['_docpress.json']).toExist()
    expect(this.files['testing.html']).toExist()
    expect(this.files['cleanup.html']).toExist()
  })

  it('renders htmls', function () {
    expect(fx.read('_docpress/index.html').toLowerCase())
      .toInclude('</h1>')
    expect(fx.read('_docpress/testing.html').toLowerCase())
      .toInclude('</h1>')
  })

  it('leaves assets alone', function () {
    expect(fx.exists('_docpress/assets/style.css')).toEqual(true)
    expect(fx.exists('_docpress/image.png')).toEqual(true)
  })

  it('deletes unused files', function () {
    expect(fx.exists('_docpress/README.md')).toEqual(false)
  })

  describe('_docpress.json', function () {
    before(function () {
      data = fx.read('_docpress/_docpress.json')
      data = JSON.parse(data)
    })

    it('has index', function () {
      expect(data.index).toExist()
    })

    it('has toc', function () {
      expect(data.toc).toExist()
    })

    it('has sources', function () {
      expect(data.sources).toExist()
    })
  })

  describe('_docpress.json/toc', function () {
    before(function () {
      data = fx.read('_docpress/_docpress.json')
      data = JSON.parse(data).toc
    })

    it('renders proper json', function () { })

    it('has headings', function () {
      expect(data.sections[0].headings.length).toBeGreaterThan(2)
    })
  })

  describe('_docpress.json/index', function () {
    before(function () {
      data = fx.read('_docpress/_docpress.json')
      data = JSON.parse(data).index
    })

    it('renders proper json', function () { })
  })
})
