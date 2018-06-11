const compile = require('../../')()

describe('index/injected_js:', function () {
  beforeEach(function (done) {
    // Mock metalsmith object
    var ms = {
      directory () { return __dirname },
      metadata () {
        return { docs: 'docs', js: 'foo.js' }
      }
    }

    this.files = {
      'README.md': {
        contents: '# My project\nHello.\n\n'
      }
    }

    require('docpress-core')()(this.files, ms, (err) => {
      if (err) throw err
      this.files['foo.js'] = { contents: '...' }
      compile(this.files, ms, (err) => {
        if (err) throw err
        done()
      })
    })
  })

  it('works', function () {
    expect(this.files['index.html']).toExist()
  })

  it('includes base script', function () {
    expect(this.files['index.html'].contents)
      .toInclude('src="assets/script.js?t=')
  })

  it('includes custom script', function () {
    expect(this.files['index.html'].contents)
      .toInclude('src="foo.js?t=')
  })
})
