(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;

},{}],2:[function(require,module,exports){
var each = require('./each')

/**
 * addClass : addClass(el, className)
 * Adds a class name to an element. Compare with `$.fn.addClass`.
 *
 *     var addClass = require('dom101/add-class');
 *
 *     addClass(el, 'active');
 */

function addClass (el, className) {
  if (!className) return

  if (Array.isArray(className)) {
    each(className, function (className) {
      addClass(el, className)
    })

    return
  }

  if (el.classList) {
    var classNames = className.split(' ').filter(Boolean)
    each(classNames, function (className) {
      el.classList.add(className)
    })
  } else {
    el.className += ' ' + className
  }
}

module.exports = addClass

},{"./each":4}],3:[function(require,module,exports){
/**
 * documentHeight : documentHeight()
 * Returns the height of the document.
 * Compare with jQuery's `$(document).height()`.
 *
 *     var documentHeight = require('dom101/document-height');
 *
 *     var height = documentHeight();
 */

function documentHeight () {
  return Math.max(
    document.documentElement.clientHeight || 0,
    document.body.scrollHeight || 0,
    document.documentElement.scrollHeight || 0,
    document.body.offsetHeight || 0,
    document.documentElement.offsetHeight || 0)
}

module.exports = documentHeight

},{}],4:[function(require,module,exports){
/**
 * each : each(list, fn)
 * Iterates through `list` (an array or an object). This is useful when dealing
 * with NodeLists like `document.querySelectorAll`.
 *
 *     var each = require('dom101/each');
 *     var qa = require('dom101/query-selector-all');
 *
 *     each(qa('.button'), function (el) {
 *       addClass('el', 'selected');
 *     });
 */

function each (list, fn) {
  var i
  var len = list.length
  var idx

  if (typeof len === 'number') {
    for (i = 0; i < len; i++) {
      fn(list[i], i)
    }
  } else {
    idx = 0
    for (i in list) {
      if (list.hasOwnProperty(i)) {
        fn(list[i], i, idx++)
      }
    }
  }

  return list
}

module.exports = each

},{}],5:[function(require,module,exports){
/**
 * hasClass : hasClass(el, className)
 * Checks if an element has a given class name.
 *
 *     var hasClass = require('dom101/has-class');
 *
 *     el.className = 'selected active';
 *     hasClass(el, 'active') //=> true
 */

function hasClass (el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}

module.exports = hasClass

},{}],6:[function(require,module,exports){
/**
 * ready : ready(fn)
 * Executes `fn` when the DOM is ready. If the DOM is already ready, the given
 * callback will be called immediately.
 *
 *     var ready = require('dom101/ready');
 *
 *     ready(function () {
 *       ...
 *     });
 */

function ready (fn) {
  if (isReady()) {
    return fn()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn)
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (isReady()) fn()
    })
  }
}

function isReady () {
  return (document.readyState === 'complete' || document.readyState === 'interactive')
}

module.exports = ready

},{}],7:[function(require,module,exports){
var each = require('./each')

/**
 * removeClass : removeClass(el, className)
 * Removes a classname.
 *
 *     var removeClass = require('dom101/remove-class');
 *
 *     el.className = 'selected active';
 *     removeClass(el, 'active');
 *
 *     el.className
 *     => "selected"
 */

function removeClass (el, className) {
  if (!className) return

  if (Array.isArray(className)) {
    each(className, function (className) {
      removeClass(el, className)
    })

    return
  }

  if (el.classList) {
    var classNames = className.split(' ').filter(Boolean)
    each(classNames, function (className) {
      el.classList.remove(className)
    })
  } else {
    var expr =
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi')

    el.className = el.className.replace(expr, ' ')
  }
}

module.exports = removeClass

},{"./each":4}],8:[function(require,module,exports){

/**
 * scrollTop : scrollTop()
 * Returns the scroll top value.
 *
 *     var scrollTop = require('dom101/scroll-top');
 *     alert(scrollTop());
 */

function scrollTop () {
  if (window.pageYOffset) return window.pageYOffset
  return document.documentElement.clientHeight
    ? document.documentElement.scrollTop
    : document.body.scrollTop
}

// Taken from https://github.com/yields/scrolltop/blob/master/index.js
module.exports = scrollTop

},{}],9:[function(require,module,exports){
/**
 * toggleClass : toggleClass(el, className, [value])
 * Adds or removes a class name to an element. If `value` is provided,
 * this will add the class if it's `true` or remove if it's `false`.
 * Compare with `$.fn.toggleClass`.
 *
 *     var toggleClass = require('dom101/toggle-class');
 *
 *     // toggles on or off:
 *     toggleClass(el, 'active');
 *
 *     // with a value:
 *     var isSelected = true;
 *     toggleClass(el, 'selected', isSelected);
 */

var addClass = require('./add-class')
var removeClass = require('./remove-class')
var hasClass = require('./has-class')

function toggleClass (el, className, value) {
  if (typeof value === 'undefined') {
    value = !hasClass(el, className)
  }

  return value
    ? addClass(el, className)
    : removeClass(el, className)
}

module.exports = toggleClass

},{"./add-class":2,"./has-class":5,"./remove-class":7}],10:[function(require,module,exports){
/* global define */
void (function (root, factory) {
  if (typeof define === 'function' && define.amd) define(factory)
  else if (typeof exports === 'object') module.exports = factory()
  else {
    if (window.jQuery) window.jQuery.onmount = factory()
    else root.onmount = factory()
  }
}(this, function ($) {
  /*
   * Internal: Registry.
   */

  var handlers, behaviors, selectors, log

  /*
   * Internal: IDs for auto-incrementing.
   */

  var bid = 0 /* behavior ID */
  var cid = 0 /* component ID */

  /**
   * (Module) Adds a behavior, or triggers behaviors.
   *
   * When no parameters are passed, it triggers all behaviors. When one
   * parameter is passed, it triggers the given behavior. Otherwise, it adds a
   * behavior.
   *
   *     // define a behavior
   *     $.onmount('.select-box', function () {
   *       $(this).on('...')
   *     })
   *
   *     // define a behavior with exit
   *     $.onmount('.select-box', function () {
   *       $(document).on('...')
   *     }, function () {
   *       $(document).off('...')
   *     })
   *
   *     // retrigger a onmount
   *     $.onmount('.select-box')
   *
   *     // retriggers all behaviors
   *     $.onmount()
   */

  function onmount (selector, init, exit, options) {
    if (typeof exit === 'object') {
      options = exit
      exit = undefined
    }

    if (arguments.length === 0 || isjQuery(selector) || isEvent(selector)) {
      // onmount() - trigger all behaviors. Also account for cases such as
      // $($.onmount), where it's triggered with a jQuery event object.
      onmount.poll()
    } else if (arguments.length === 1) {
      // onmount(selector) - trigger for a given selector.
      onmount.poll(selector)
    } else {
      // onmount(sel, fn, [fn]) - register a new behavior.
      var be = new Behavior(selector, init, exit, options)
      behaviors.push(be)
      be.register()
    }

    return this
  }

  /*
   * Use jQuery (or a jQuery-like) when available. This will allow
   * the use of jQuery selectors.
   */

  onmount.$ = window.jQuery || window.Zepto || window.Ender

  /*
   * Detect MutationObserver support for `onmount.observe()`.
   * You may even add a polyfill here via
   * `onmount.MutationObserver = require('mutation-observer')`.
   */

  onmount.MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver

  /**
   * Set this to true if you want to see debug messages.
   */

  onmount.debug = false

  /**
   * Internal: triggers behaviors for a selector or for all.
   *
   *     onmount.poll()
   *     onmount.poll('.js-button')
   */

  onmount.poll = function poll (selector) {
    if (selector) selector = onmount.selectify(selector)
    var functions = (selector ? selectors[selector] : handlers) || []
    each(functions, function (fn) { fn() })
  }

  /**
   * Observes automatically using MutationObserver events.
   *
   *     onmount.observe()
   */

  onmount.observe = function observe () {
    var MutationObserver = onmount.MutationObserver
    if (typeof MutationObserver === 'undefined') return

    var obs = new MutationObserver(function (mutations) {
      each(behaviors, function (be) {
        each(mutations, function (mutation) {
          each(mutation.addedNodes, function (el) {
            if (matches(el, be.selector)) be.visitEnter(el)
          })

          each(mutation.removedNodes, function (el) {
            if (matches(el, be.selector)) be.doExit(el)
          })
        })
      })
    })

    obs.observe(document, { subtree: true, childList: true })
    onmount.observer = obs

    // trigger everything before going
    onmount()
    return true
  }

  /**
   * Turns off observation first issued by `onmount.observe()`.
   */

  onmount.unobserve = function unobserve () {
    if (!this.observer) return
    this.observer.disconnect()
    delete this.observer
  }

  /**
   * Forces teardown of all behaviors currently applied.
   */

  onmount.teardown = function teardown () {
    each(behaviors, function (be) {
      each(be.loaded, function (el, i) {
        if (el) be.doExit(el, i)
      })
    })
  }

  /**
   * Clears all behaviors. Useful for tests.
   * This will NOT call exit handlers.
   */

  onmount.reset = function reset () {
    handlers = onmount.handlers = []
    selectors = onmount.selectors = {}
    behaviors = onmount.behaviors = []
  }

  /**
   * Internal: Converts `@role` to `[role~="role"]` if needed. You can override
   * this by reimplementing `onmount.selectify`.
   *
   *     selectify('@hi')   //=> '[role="hi"]'
   *     selectify('.btn')  //=> '.btn'
   */

  onmount.selectify = function selectify (selector) {
    if (selector[0] === '@') {
      return '[role~="' + selector.substr(1).replace(/"/g, '\\"') + '"]'
    }
    return selector
  }

  /**
   * Internal: behavior class
   */

  function Behavior (selector, init, exit, options) {
    this.id = 'b' + bid++
    this.init = init
    this.exit = exit
    this.selector = onmount.selectify(selector)
    this.loaded = [] // keep track of dom elements loaded for this behavior
    this.key = '__onmount:' + bid // leave the state in el['__onmount:12']
    this.detectMutate = options && options.detectMutate
  }

  /**
   * Internal: initialize this behavior by registering itself to the internal
   * `selectors` map. This allows you to call `onmount(selector)` later on.
   */

  Behavior.prototype.register = function () {
    var be = this
    var loaded = this.loaded
    var selector = this.selector

    register(selector, function () {
      var list = query(selector)

      // This is the function invoked on `onmount(selector)`.
      // Clean up old ones (if they're not in the DOM anymore).
      each(loaded, function (element, i) {
        be.visitExit(element, i, list)
      })

      // Clean up new ones (if they're not loaded yet).
      eachOf(list, function (element) {
        be.visitEnter(element)
      })
    })
  }

  /**
   * Internal: visits the element `el` and turns it on if applicable.
   */

  Behavior.prototype.visitEnter = function (el) {
    if (el[this.key]) return
    var options = { id: 'c' + cid, selector: this.selector }
    if (this.init.call(el, options) !== false) {
      if (onmount.debug) log('enter', this.selector, el)
      el[this.key] = options
      this.loaded.push(el)
      cid++
    }
  }

  /**
   * Internal: visits the element `el` and sees if it needs its exit handler
   * called.
   */

  Behavior.prototype.visitExit = function (el, i, list) {
    if (!el) return
    if (this.detectMutate) {
      if (!has(list, el)) return this.doExit(el, i)
    } else {
      if (!isAttached(el)) return this.doExit(el, i)
    }
  }

  /**
   * Internal: calls the exit handler for the behavior for element `el` (if
   * available), and marks the behavior/element as uninitialized.
   */

  Behavior.prototype.doExit = function (el, i) {
    if (typeof i === 'undefined') i = this.loaded.indexOf(el)
    this.loaded[i] = undefined
    if (this.exit && this.exit.call(el, el[this.key]) !== false) {
      if (onmount.debug) log('exit', this.selector, el)
      delete el[this.key]
    }
  }

  /**
   * Internal: check if an element is still attached to its document.
   */

  function isAttached (el) {
    while (el) {
      if (el === document.documentElement) return true
      el = el.parentElement
    }
  }

  /**
   * Internal: reimplementation of `$('...')`. If jQuery is available,
   * use it (I guess to preserve IE compatibility and to enable special jQuery
   * attribute selectors). Use with `eachOf()` or `has()`.
   */

  function query (selector, fn) {
    if (onmount.$) return onmount.$(selector)
    return document.querySelectorAll(selector)
  }

  /**
   * Internal: iterates through a `query()` result.
   */

  function eachOf (list, fn) {
    if (onmount.$) return list.each(function (i) { fn(this, i) })
    return each(list, fn)
  }

  /**
   * Interanl: checks if given element `el` is in the query result `list`.
   */

  function has (list, el) {
    if (onmount.$) return list.index(el) > -1
    return list.indexOf(el) > -1
  }

  /**
   * Internal: registers a behavior handler for a selector.
   */

  function register (selector, fn) {
    if (!selectors[selector]) selectors[selector] = []
    selectors[selector].push(fn)
    handlers.push(fn)
  }

  /**
   * Checks if a given element `el` matches `selector`.
   * Compare with [$.fn.is](http://api.jquery.com/is/).
   *
   *     var matches = require('dom101/matches');
   *
   *     matches(button, ':focus');
   */

  function matches (el, selector) {
    var _matches = el.matches ||
      el.matchesSelector ||
      el.msMatchesSelector ||
      el.mozMatchesSelector ||
      el.webkitMatchesSelector ||
      el.oMatchesSelector

    if (onmount.$) {
      return onmount.$(el).is(selector)
    } else if (_matches) {
      return _matches.call(el, selector)
    } else if (el.parentNode) {
      // IE8 and below
      var nodes = el.parentNode.querySelectorAll(selector)
      for (var i = nodes.length; i--; 0) {
        if (nodes[i] === el) return true
      }
      return false
    }
  }

  /**
   * Iterates through `list` (an array or an object). This is useful when dealing
   * with NodeLists like `document.querySelectorAll`.
   *
   *     var each = require('dom101/each');
   *     var qa = require('dom101/query-selector-all');
   *
   *     each(qa('.button'), function (el) {
   *       addClass('el', 'selected');
   *     });
   */

  function each (list, fn) {
    var i
    var len = list.length

    if (len === +len) {
      for (i = 0; i < len; i++) { fn(list[i], i) }
    } else {
      for (i in list) {
        if (list.hasOwnProperty(i)) fn(list[i], i)
      }
    }

    return list
  }

  /**
   * Internal: Check if a given object is jQuery
   */

  function isjQuery ($) {
    return typeof $ === 'function' && $.fn && $.noConflict
  }

  function isEvent (e) {
    return typeof e === 'object' && e.target
  }

  /**
   * Internal: logging
   */

  var styles = {
    enter: 'background-color:#dfd;font-weight:bold;color:#141',
    exit: 'background-color:#fdd;font-weight:bold;color:#411'
  }

  if (~navigator.userAgent.indexOf('Mozilla')) {
    log = function (type, selector, el) {
      console.log('%c %s ', styles[type], selector, el)
    }
  } else {
    log = function (type, selector, el) {
      console.log('(onmount)', type, selector)
    }
  }

  /*
   * Export
   */

  onmount.reset()
  return onmount
}))

},{}],11:[function(require,module,exports){
// Check API component

function ApiCheck (el) {
  var form = el.querySelector('[data-api-check-form]')
  var button = el.querySelector('button')
  var input = el.querySelector('input[type=text]')

  button.addEventListener('click', handleSubmit)

  function handleSubmit (e) {
    e.preventDefault()
    var option = form.querySelector('input[type=radio]:checked')
    if (option && input.value) {
      fetchApi(option.value, input.value)
    }
  }

  function handleClose (e) {
    e.preventDefault()
    removeResponse()
  }

  function showResponse (msg, status) {
    removeResponse()
    var pre = document.createElement('pre')
    var closeLink = document.createElement('a')
    pre.classList.add('api-check__pre')
    pre.classList.add(status)
    closeLink.setAttribute('href', '#')
    closeLink.classList.add('api-check__close')
    closeLink.innerText = 'Close'
    el.appendChild(pre).innerHTML = syntaxHighlight(msg)
    pre.appendChild(closeLink)
    closeLink.addEventListener('click', handleClose)
  }
  
  function removeResponse () {
    var previousPre = el.querySelector('pre')
    if (previousPre) previousPre.remove()
  }

  function fetchApi (type, name, cb) {
    var req = new XMLHttpRequest()
    req.open('GET', 'https://wptide.org/api/tide/v1/audit/wporg/'+ type +'/'+ name, true)
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if(req.status == 200) showResponse(JSON.parse(req.responseText), 'success')
        else showResponse('The '+type+' you\'re looking for does not exist in our database. Make sure you entered a right name or try to search for something else.', 'error')
      }
    }
    req.send(null)
  }

  function syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }

    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'hljs-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'hljs-attr';
        } else {
          cls = 'pl-s';
        }
      } else if (/true|false/.test(match)) {
        cls = 'pl-c1';
      } else if (/null/.test(match)) {
        cls = 'pl-c1';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}

module.exports = ApiCheck
},{}],12:[function(require,module,exports){
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md

void (function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
},{}],13:[function(require,module,exports){
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

},{"./apicheck":11,"./polyfills":12,"./scrollclass":14,"./scrolltrack":15,"./waves":16,"dom101/ready":6,"dom101/toggle-class":9,"onmount":10}],14:[function(require,module,exports){
var debounce = require('debounce')
var documentHeight = require('dom101/document-height')
var toggleClass = require('dom101/toggle-class')
var scrollTop = require('dom101/scroll-top')

/**
 * Listens for scrolling.
 * Available options:
 *
 * * `parent` (Element) — the parent to listen for scroll events to. Defaults
 *   to `document.`
 * * `className` (String) — classname to apply to the function.
 * * `onresize` (Function) — callback to run when the window resizes. Use
 *   this to cache metrics.
 * * `onscroll` (Function) — callback to run when scrolling. When this returns
 *   true, `className` will be applied; if false, it'll be removed.
 */

function Scrollclass (el, options) {
  if (!(this instanceof Scrollclass)) return new Scrollclass(el, options)
  if (!options) options = {}

  this.el = q(el)
  this.parent = q(options.parent || document)
  this.className = options.className || 'active'
  this.onresize = (options.onresize || noop).bind(this)
  this.onscroll = (options.onscroll || noop).bind(this)

  this._onscroll = debounce(this.poll.bind(this), 5)
  this._onresize = debounce(this.update.bind(this), 5)

  this.listen()
}

/**
 * Fires event listeners.
 */

Scrollclass.prototype.listen = function () {
  window.addEventListener('resize', this._onresize)
  window.addEventListener('resize', this._onscroll)
  document.addEventListener('load', this._onresize, true) // image events
  document.addEventListener('load', this._onscroll, true)
  this.parent.addEventListener('scroll', this._onscroll)
  this._onresize()
  this._onscroll()
}

/**
 * Destroys all event listeners.
 */

Scrollclass.prototype.destroy = function () {
  window.removeEventListener('resize', this._onresize)
  window.removeEventListener('resize', this._onscroll)
  document.removeEventListener('load', this._onresize, true)
  document.removeEventListener('load', this._onscroll, true)
  this.parent.removeEventListener('scroll', this._onscroll)
}

/**
 * Internal: Updates data on window resize. This sets some useful stuff that
 * can be used by the `onscroll` handler.
 */

Scrollclass.prototype.update = function () {
  this.documentHeight = documentHeight()
  this.winHeight = window.innerHeight
  this.maxScroll = this.documentHeight - this.winHeight
  this.onresize()
}

/**
 * Internal: scroll handler.
 */

Scrollclass.prototype.poll = function () {
  var result = this.onscroll(scrollTop())
  toggleClass(this.el, this.className, result)
}

function noop () {}

/**
 * Internal: helper to normalize between CSS selectors, DOM elements and
 * jQuery objects.
 */

function q (el) {
  if (typeof el === 'string') return document.querySelector(el)
  else if (typeof el === 'object' && el[0]) return el[0]
  else return el
}

module.exports = Scrollclass

},{"debounce":1,"dom101/document-height":3,"dom101/scroll-top":8,"dom101/toggle-class":9}],15:[function(require,module,exports){
var toggleClass = require('dom101/toggle-class')
var scrollTop = require('dom101/scroll-top')
var documentHeight = require('dom101/document-height')
var debounce = require('debounce')
var each = require('dom101/each')

/**
 * Tracks scrolling. Options:
 *
 * - `selectors` (String)
 * - `parent` (String) - where headings are. defaults to `document`
 * - `menu` (String | Element) - where links are.
 * - `scrollParent` (String | Element) - where to listen for scroll events.
 * - `onupdate` (Function) - callback to invoke when links change.
 */

function Scrolltrack (options) {
  if (!(this instanceof Scrolltrack)) return new Scrolltrack(options)
  if (!options) options = {}

  this.selector = options.selector || 'h1, h2, h3, h4, h5, h6'
  this.parent = options.parent || document
  this.onupdate = options.onupdate || function () {}
  this.menu = options.menu || document
  this.scrollParent = options.scrollParent || document
  this.offsetPercent = options.offsetPercent || 0.1

  this.listener = debounce(this.onScroll, 5).bind(this)
  this.update = debounce(this._update, 20).bind(this)
  this.active = undefined
  this.index = []

  this.listen()
  this.update()
}

/**
 * Internal: Attaches event listeners.
 * No need to call this; the constructor already does this.
 */

Scrolltrack.prototype.listen = function () {
  q(this.scrollParent).addEventListener('scroll', this.listener)
  document.addEventListener('load', this.update, true) // image events
  document.addEventListener('load', this.listener, true)
  window.addEventListener('resize', this.update)
  window.addEventListener('resize', this.listener)
}

/**
 * Stops listening for events.
 */

Scrolltrack.prototype.destroy = function () {
  q(this.scrollParent).removeEventListener('scroll', this.listener)
  document.removeEventListener('load', this.update, true)
  document.removeEventListener('load', this.listener, true)
  window.removeEventListener('resize', this.update)
  window.removeEventListener('resize', this.listener)
}

/**
 * Internal: Updates the index of the headings and links.
 * Used by `update()`.
 */

Scrolltrack.prototype.reindex = function () {
  var headings = this.parent.querySelectorAll(this.selector)
  var index = this.index = []
  var ids = {}

  var menu = q(this.menu)

  each(headings, function (heading) {
    var rect = heading.getBoundingClientRect()
    var id = heading.getAttribute('id')

    if (!ids[id]) ids[id] = 0
    else ids[id]++

    var links = menu.querySelectorAll('[href=' + JSON.stringify('#' + id) + ']')

    index.push({
      el: heading,
      id: id,
      link: links[ids[id]],
      top: rect.top + scrollTop()
    })
  })

  this.metrics = {
    windowHeight: window.innerHeight,
    documentHeight: documentHeight()
  }
}

/**
 * update : update()
 * Updates indices. Call this when the DOM changes.
 */

Scrolltrack.prototype._update = function () {
  this.reindex()
  this.onScroll()
}

/**
 * Internal: check for updates when scrolling. This is attached to the
 * document's scroll event.
 */

Scrolltrack.prototype.onScroll = function () {
  var y = this.scrollTop()
  var active

  each(this.index, function (heading) {
    if (heading.top < y) active = heading
  })

  if (active !== this.active) {
    var last = this.active
    this.active = active
    this.follow(active, last)
    this.onupdate(active, last)
  }
}

/**
 * Returns the scroll position. This also takes care of scaling it to go all
 * the way to the bottom.
 */

Scrolltrack.prototype.scrollTop = function () {
  var y = scrollTop()
  var offset = 0
  var k = this.offsetPercent

  if (this.metrics) {
    var screen = this.metrics.windowHeight
    var maxY = this.metrics.documentHeight - screen
    var fold = maxY - screen * 1.2

    if (y > fold) {
      var lastPercent = (y - fold) / screen
      offset = screen * (k + (1 - k) * lastPercent)
    } else {
      offset = screen * k
    }
  }

  return y + offset
}

/**
 * Updates the selected link.
 */

Scrolltrack.prototype.follow = function (heading, last) {
  if (this.lastlink) {
    toggleClass(this.lastlink, '-active', false)
    this.lastlink = null
  }

  if (heading && heading.link) {
    toggleClass(heading.link, '-active', true)
    this.lastlink = heading.link
  }
}

/**
 * Internal: helper to normalize between CSS selectors, DOM elements and
 * jQuery objects.
 */

function q (el) {
  if (typeof el === 'string') return document.querySelector(el)
  else if (typeof el === 'object' && el[0]) return el[0]
  else return el
}

module.exports = Scrolltrack

},{"debounce":1,"dom101/document-height":3,"dom101/each":4,"dom101/scroll-top":8,"dom101/toggle-class":9}],16:[function(require,module,exports){
// Waves for homepage hero section

function Waves (canvas) {
  var ctx = canvas.getContext('2d')
  var parentRect = canvas.parentNode.getBoundingClientRect()
  var height = canvas.height = parentRect.height
  var width = canvas.width = Math.min(parentRect.width + 300, window.innerWidth - 400)

  // Stage
  var fov = 1024
  var zRows = width / 60
  var xRows = width / 50
  var yBase = 800
  var spacing = width / xRows
  var dotSize = 2
  var tickDiv = 20
  var tick = 0
  var isStop = false

  // Points
  var points = []
  
  for (var z = 0; z < zRows; z++) {
    for (var x = -xRows/2; x < xRows/2; x++) {
      points.push(new Point({
        x: x * spacing + dotSize,
        y: yBase,
        z: z * spacing,
        yRange: 20,
        tickOffset: (z * 7) + (x * 5)
      }))
    }
  }

  function Point (config) {
    for (var key in config) this[key] = config[key]
  }

  Point.prototype.update = function () {
    var z2d = fov / (this.z + fov)

    this.yFloat = this.yRange * Math.sin((tick + this.tickOffset) / tickDiv)
    this.distance = (this.z / spacing) / zRows
    this.x2d = (this.x * z2d) + (width / 2)
    this.y2d = (this.y * z2d) + (height / 2) - (this.y * 0.7) + this.yFloat
    this.dotSize = dotSize * (1 - this.distance)
    this.alpha = 1 * (1 - this.distance)
  }

  Point.prototype.drawDot = function () {
    ctx.beginPath()
    ctx.arc(this.x2d, this.y2d, this.dotSize, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgba(0,0,0,' + this.alpha + ')'
    ctx.fill()
  }
  
  function animate () {
    if (isStop) return
    ++tick
    ctx.clearRect(0,0,width,height)
  
    points.forEach(function (point, i) {
      var prevX = points[i-1]
      var prevY = points[i - xRows]
      point.update()
      point.drawDot()
    })
  
    requestAnimationFrame(animate)
  }

  function stop () {
    isStop = true
  }

  return {
    run: animate,
    stop: stop
  }
}

module.exports = Waves
},{}]},{},[13]);
