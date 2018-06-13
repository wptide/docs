require('./polyfills')
var onmount = require('onmount')
var toggleClass = require('dom101/toggle-class')
var ready = require('dom101/ready')
var Scrolltrack = require('./scrolltrack')
var Scrollclass = require('./scrollclass')
var Waves = require('./waves')
var ApiCheck = require('./apicheck')

/*
 * onmount
 */

ready(function () {
  onmount()
})

/*
 * menu toggle
 */

onmount('.js-menu-toggle', function () {
  this.addEventListener('click', function () {
    toggleClass(document.body, '-menu-visible')
  })
})

/*
 * scrolltrack
 */

void (function () {
  var st = new Scrolltrack({
    menu: '.toc-menu',
    selector: 'h2, h3',
    onupdate: function (active, last) {
      var menu = document.querySelector('.toc-menu')
      var link = menu.querySelector('.link.-active, .link.-notactive')

      toggleClass(link, '-active', !active)
      toggleClass(link, '-notactive', active)
    }
  })

  document.addEventListener('pjax:complete', function () {
    st.update()
  })

  ready(function () {
    st.update()
  })
}())

/*
 * scrollclass
 */

onmount('.footer-nav', function (b) {
  b.sc = Scrollclass(this, {
    className: '-expanded',
    onscroll: function (y) {
      return this.maxScroll - y < 88
    }
  })
})

onmount('.header-nav', function (b) {
  b.sc = Scrollclass(this, {
    className: '-expanded',
    onscroll: function (y) { return y < 40 }
  })
})

/*
 * waves
 */

onmount('canvas', function (b) {
  var el = this
  function create() {
    if (b.waves) b.waves.stop()
    if (matchMedia('(min-width: 959px)')) {
      b.waves = new Waves(el)
      b.waves.run()
    }
  }

  create()
  window.addEventListener('resize', create)
})

/*
 * apicheck
 */

onmount('[data-api-check]', function (b) {
  b.apicheck = new ApiCheck(this)
})
