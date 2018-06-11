const compile = require('../../')()

describe('index/basic:', function () {
  beforeEach(function (done) {
    // Mock metalsmith object
    var ms = {
      directory () { return __dirname },
      metadata () { return { docs: 'docs' } }
    }

    this.files = {
      'docs/README.md': {
        contents:
          '* [My project](../README.md)\n' +
          '* [Intro](intro.md)\n'
      },
      'README.md': {
        contents:
          '# My project\nHello.\n\n' +
          '### Usage\n' +
          'Use it wisely'
      },
      'docs/intro.md': {
        contents: '# Introduction\n'
      }
    }

    require('docpress-core')()(this.files, ms, (err) => {
      if (err) throw err
      compile(this.files, ms, (err) => {
        if (err) throw err
        done()
      })
    })
  })

  it('works', function () {
    expect(this.files['index.html']).toExist()
  })

  describe('index.html', function () {
    beforeEach(function () {
      this.contents = this.files['index.html'].contents
    })

    it('renders markdown', function () {
      expect(this.contents).toInclude('<h1 id="my-project">')
    })

    it('renders styles', function () {
      expect(this.contents)
        .toMatch(/assets\/style.css\?t=[a-f0-9]{8}/)
    })

    it('renders scripts', function () {
      expect(this.contents)
        .toMatch(/assets\/script.js\?t=[a-f0-9]{8}/)
    })
  })
})
