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

module.exports = function debounce(func, wait, immediate){
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
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});


},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
var executeScripts = require("./lib/execute-scripts.js")
var forEachEls = require("./lib/foreach-els.js")
var parseOptions = require("./lib/parse-options.js")
var switches = require("./lib/switches")
var newUid = require("./lib/uniqueid.js")

var on = require("./lib/events/on.js")
var trigger = require("./lib/events/trigger.js")

var clone = require("./lib/util/clone.js")
var contains = require("./lib/util/contains.js")
var extend = require("./lib/util/extend.js")
var noop = require("./lib/util/noop")

var Pjax = function(options) {
    this.state = {
      numPendingSwitches: 0,
      href: null,
      options: null
    }


    this.options = parseOptions(options)
    this.log("Pjax options", this.options)

    if (this.options.scrollRestoration && "scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }

    this.maxUid = this.lastUid = newUid()

    this.parseDOM(document)

    on(window, "popstate", function(st) {
      if (st.state) {
        var opt = clone(this.options)
        opt.url = st.state.url
        opt.title = st.state.title
        opt.history = false
        opt.scrollPos = st.state.scrollPos
        if (st.state.uid < this.lastUid) {
          opt.backward = true
        }
        else {
          opt.forward = true
        }
        this.lastUid = st.state.uid

        // @todo implement history cache here, based on uid
        this.loadUrl(st.state.url, opt)
      }
    }.bind(this))
  }

Pjax.switches = switches

Pjax.prototype = {
  log: require("./lib/proto/log.js"),

  getElements: function(el) {
    return el.querySelectorAll(this.options.elements)
  },

  parseDOM: function(el) {
    var parseElement = require("./lib/proto/parse-element")
    forEachEls(this.getElements(el), parseElement, this)
  },

  refresh: function(el) {
    this.parseDOM(el || document)
  },

  reload: function() {
    window.location.reload()
  },

  attachLink: require("./lib/proto/attach-link.js"),

  attachForm: require("./lib/proto/attach-form.js"),

  forEachSelectors: function(cb, context, DOMcontext) {
    return require("./lib/foreach-selectors.js").bind(this)(this.options.selectors, cb, context, DOMcontext)
  },

  switchSelectors: function(selectors, fromEl, toEl, options) {
    return require("./lib/switches-selectors.js").bind(this)(this.options.switches, this.options.switchesOptions, selectors, fromEl, toEl, options)
  },

  latestChance: function(href) {
    window.location = href
  },

  onSwitch: function() {
    trigger(window, "resize scroll")

    this.state.numPendingSwitches--

    // debounce calls, so we only run this once after all switches are finished.
    if (this.state.numPendingSwitches === 0) {
      this.afterAllSwitches()
    }
  },

  loadContent: function(html, options) {
    var tmpEl = document.implementation.createHTMLDocument("pjax")

    // parse HTML attributes to copy them
    // since we are forced to use documentElement.innerHTML (outerHTML can't be used for <html>)
    var htmlRegex = /<html[^>]+>/gi
    var htmlAttribsRegex = /\s?[a-z:]+(?:\=(?:\'|\")[^\'\">]+(?:\'|\"))*/gi
    var matches = html.match(htmlRegex)
    if (matches && matches.length) {
      matches = matches[0].match(htmlAttribsRegex)
      if (matches.length) {
        matches.shift()
        matches.forEach(function(htmlAttrib) {
          var attr = htmlAttrib.trim().split("=")
          if (attr.length === 1) {
            tmpEl.documentElement.setAttribute(attr[0], true)
          }
          else {
            tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1))
          }
        })
      }
    }

    tmpEl.documentElement.innerHTML = html
    this.log("load content", tmpEl.documentElement.attributes, tmpEl.documentElement.innerHTML.length)

    // Clear out any focused controls before inserting new page contents.
    if (document.activeElement && contains(document, this.options.selectors, document.activeElement)) {
      try {
        document.activeElement.blur()
      } catch (e) { }
    }

    this.switchSelectors(this.options.selectors, tmpEl, document, options)
  },

  abortRequest: require("./lib/abort-request.js"),

  doRequest: require("./lib/send-request.js"),

  handleResponse: require("./lib/proto/handle-response.js"),

  loadUrl: function(href, options) {
    options = typeof options === "object" ?
      extend({}, this.options, options) :
      clone(this.options)

    this.log("load href", href, options)

    // Abort any previous request
    this.abortRequest(this.request)

    trigger(document, "pjax:send", options)

    // Do the request
    this.request = this.doRequest(href, options, this.handleResponse.bind(this))
  },

  afterAllSwitches: function() {
    // FF bug: Won’t autofocus fields that are inserted via JS.
    // This behavior is incorrect. So if theres no current focus, autofocus
    // the last field.
    //
    // http://www.w3.org/html/wg/drafts/html/master/forms.html
    var autofocusEl = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop()
    if (autofocusEl && document.activeElement !== autofocusEl) {
      autofocusEl.focus()
    }

    // execute scripts when DOM have been completely updated
    this.options.selectors.forEach(function(selector) {
      forEachEls(document.querySelectorAll(selector), function(el) {
        executeScripts(el)
      })
    })

    var state = this.state

    if (state.options.history) {
      if (!window.history.state) {
        this.lastUid = this.maxUid = newUid()
        window.history.replaceState({
            url: window.location.href,
            title: document.title,
            uid: this.maxUid,
            scrollPos: [0, 0]
          },
          document.title)
      }

      // Update browser history
      this.lastUid = this.maxUid = newUid()

      window.history.pushState({
          url: state.href,
          title: state.options.title,
          uid: this.maxUid,
          scrollPos: [0, 0]
        },
        state.options.title,
        state.href)
    }

    this.forEachSelectors(function(el) {
      this.parseDOM(el)
    }, this)

    // Fire Events
    trigger(document,"pjax:complete pjax:success", state.options)

    if (typeof state.options.analytics === "function") {
      state.options.analytics()
    }

    if (state.options.history) {
      // First parse url and check for hash to override scroll
      var a = document.createElement("a")
      a.href = this.state.href
      if (a.hash) {
        var name = a.hash.slice(1)
        name = decodeURIComponent(name)

        var curtop = 0
        var target = document.getElementById(name) || document.getElementsByName(name)[0]
        if (target) {
          // http://stackoverflow.com/questions/8111094/cross-browser-javascript-function-to-find-actual-position-of-an-element-in-page
          if (target.offsetParent) {
            do {
              curtop += target.offsetTop

              target = target.offsetParent
            } while (target)
          }
        }
        window.scrollTo(0, curtop)
      }
      else if (state.options.scrollTo !== false) {
        // Scroll page to top on new page load
        if (state.options.scrollTo.length > 1) {
          window.scrollTo(state.options.scrollTo[0], state.options.scrollTo[1])
        }
        else {
          window.scrollTo(0, state.options.scrollTo)
        }
      }
    }
    else if (state.options.scrollRestoration && state.options.scrollPos) {
      window.scrollTo(state.options.scrollPos[0], state.options.scrollPos[1])
    }

    this.state = {
      numPendingSwitches: 0,
      href: null,
      options: null
    }
  }
}

Pjax.isSupported = require("./lib/is-supported.js")

// arguably could do `if( require("./lib/is-supported.js")()) {` but that might be a little to simple
if (Pjax.isSupported()) {
  module.exports = Pjax
}
// if there isn’t required browser functions, returning stupid api
else {
  var stupidPjax = noop
  for (var key in Pjax.prototype) {
    if (Pjax.prototype.hasOwnProperty(key) && typeof Pjax.prototype[key] === "function") {
      stupidPjax[key] = noop
    }
  }

  module.exports = stupidPjax
}

},{"./lib/abort-request.js":13,"./lib/events/on.js":15,"./lib/events/trigger.js":16,"./lib/execute-scripts.js":17,"./lib/foreach-els.js":18,"./lib/foreach-selectors.js":19,"./lib/is-supported.js":20,"./lib/parse-options.js":21,"./lib/proto/attach-form.js":22,"./lib/proto/attach-link.js":23,"./lib/proto/handle-response.js":24,"./lib/proto/log.js":25,"./lib/proto/parse-element":26,"./lib/send-request.js":27,"./lib/switches":29,"./lib/switches-selectors.js":28,"./lib/uniqueid.js":30,"./lib/util/clone.js":31,"./lib/util/contains.js":32,"./lib/util/extend.js":33,"./lib/util/noop":34}],13:[function(require,module,exports){
var noop = require("./util/noop")

module.exports = function(request) {
  if (request && request.readyState < 4) {
    request.onreadystatechange = noop
    request.abort()
  }
}

},{"./util/noop":34}],14:[function(require,module,exports){
module.exports = function(el) {
  var code = (el.text || el.textContent || el.innerHTML || "")
  var src = (el.src || "")
  var parent = el.parentNode || document.querySelector("head") || document.documentElement
  var script = document.createElement("script")

  if (code.match("document.write")) {
    if (console && console.log) {
      console.log("Script contains document.write. Can’t be executed correctly. Code skipped ", el)
    }
    return false
  }

  script.type = "text/javascript"

  /* istanbul ignore if */
  if (src !== "") {
    script.src = src
    script.async = false // force synchronous loading of peripheral JS
  }

  if (code !== "") {
    try {
      script.appendChild(document.createTextNode(code))
    }
    catch (e) {
      /* istanbul ignore next */
      // old IEs have funky script nodes
      script.text = code
    }
  }

  // execute
  parent.appendChild(script)
  // avoid pollution only in head or body tags
  if (parent instanceof HTMLHeadElement || parent instanceof HTMLBodyElement) {
    parent.removeChild(script)
  }

  return true
}

},{}],15:[function(require,module,exports){
var forEachEls = require("../foreach-els")

module.exports = function(els, events, listener, useCapture) {
  events = (typeof events === "string" ? events.split(" ") : events)

  events.forEach(function(e) {
    forEachEls(els, function(el) {
      el.addEventListener(e, listener, useCapture)
    })
  })
}

},{"../foreach-els":18}],16:[function(require,module,exports){
var forEachEls = require("../foreach-els")

module.exports = function(els, events, opts) {
  events = (typeof events === "string" ? events.split(" ") : events)

  events.forEach(function(e) {
    var event
    event = document.createEvent("HTMLEvents")
    event.initEvent(e, true, true)
    event.eventName = e
    if (opts) {
      Object.keys(opts).forEach(function(key) {
        event[key] = opts[key]
      })
    }

    forEachEls(els, function(el) {
      var domFix = false
      if (!el.parentNode && el !== document && el !== window) {
        // THANK YOU IE (9/10/11)
        // dispatchEvent doesn't work if the element is not in the DOM
        domFix = true
        document.body.appendChild(el)
      }
      el.dispatchEvent(event)
      if (domFix) {
        el.parentNode.removeChild(el)
      }
    })
  })
}

},{"../foreach-els":18}],17:[function(require,module,exports){
var forEachEls = require("./foreach-els")
var evalScript = require("./eval-script")
// Finds and executes scripts (used for newly added elements)
// Needed since innerHTML does not run scripts
module.exports = function(el) {
  if (el.tagName.toLowerCase() === "script") {
    evalScript(el)
  }

  forEachEls(el.querySelectorAll("script"), function(script) {
    if (!script.type || script.type.toLowerCase() === "text/javascript") {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      evalScript(script)
    }
  })
}

},{"./eval-script":14,"./foreach-els":18}],18:[function(require,module,exports){
/* global HTMLCollection: true */

module.exports = function(els, fn, context) {
  if (els instanceof HTMLCollection || els instanceof NodeList || els instanceof Array) {
    return Array.prototype.forEach.call(els, fn, context)
  }
  // assume simple DOM element
  return fn.call(context, els)
}

},{}],19:[function(require,module,exports){
var forEachEls = require("./foreach-els")

module.exports = function(selectors, cb, context, DOMcontext) {
  DOMcontext = DOMcontext || document
  selectors.forEach(function(selector) {
    forEachEls(DOMcontext.querySelectorAll(selector), cb, context)
  })
}

},{"./foreach-els":18}],20:[function(require,module,exports){
module.exports = function() {
  // Borrowed wholesale from https://github.com/defunkt/jquery-pjax
  return window.history &&
    window.history.pushState &&
    window.history.replaceState &&
    // pushState isn’t reliable on iOS until 5.
    !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)
}

},{}],21:[function(require,module,exports){
/* global _gaq: true, ga: true */

var defaultSwitches = require("./switches")

module.exports = function(options) {
  options = options || {}
  options.elements = options.elements || "a[href], form[action]"
  options.selectors = options.selectors || ["title", ".js-Pjax"]
  options.switches = options.switches || {}
  options.switchesOptions = options.switchesOptions || {}
  options.history = options.history || true
  options.analytics = (typeof options.analytics === "function" || options.analytics === false) ? options.analytics : defaultAnalytics
  options.scrollTo = (typeof options.scrollTo === "undefined") ? 0 : options.scrollTo
  options.scrollRestoration = (typeof options.scrollRestoration !== "undefined") ? options.scrollRestoration : true
  options.cacheBust = (typeof options.cacheBust === "undefined") ? true : options.cacheBust
  options.debug = options.debug || false
  options.timeout = options.timeout || 0
  options.currentUrlFullReload = (typeof options.currentUrlFullReload === "undefined") ? false : options.currentUrlFullReload

  // We can’t replace body.outerHTML or head.outerHTML.
  // It creates a bug where a new body or head are created in the DOM.
  // If you set head.outerHTML, a new body tag is appended, so the DOM has 2 body nodes, and vice versa
  if (!options.switches.head) {
    options.switches.head = defaultSwitches.switchElementsAlt
  }
  if (!options.switches.body) {
    options.switches.body = defaultSwitches.switchElementsAlt
  }

  return options
}

/* istanbul ignore next */
function defaultAnalytics() {
  if (window._gaq) {
    _gaq.push(["_trackPageview"])
  }
  if (window.ga) {
    ga("send", "pageview", {page: location.pathname, title: document.title})
  }
}

},{"./switches":29}],22:[function(require,module,exports){
var on = require("../events/on")
var clone = require("../util/clone")

var attrState = "data-pjax-state"

var formAction = function(el, event) {
  if (isDefaultPrevented(event)) {
    return
  }

  // Since loadUrl modifies options and we may add our own modifications below,
  // clone it so the changes don't persist
  var options = clone(this.options)

  // Initialize requestOptions
  options.requestOptions = {
    requestUrl: el.getAttribute("action") || window.location.href,
    requestMethod: el.getAttribute("method") || "GET"
  }

  // create a testable virtual link of the form action
  var virtLinkElement = document.createElement("a")
  virtLinkElement.setAttribute("href", options.requestOptions.requestUrl)

  var attrValue = checkIfShouldAbort(virtLinkElement, options)
  if (attrValue) {
    el.setAttribute(attrState, attrValue)
    return
  }

  event.preventDefault()

  if (el.enctype === "multipart/form-data") {
    options.requestOptions.formData = new FormData(el)
  }
  else {
    options.requestOptions.requestParams = parseFormElements(el)
  }

  el.setAttribute(attrState, "submit")

  options.triggerElement = el
  this.loadUrl(virtLinkElement.href, options)
}

function parseFormElements(el) {
  var requestParams = []

  for (var elementKey in el.elements) {
    if (Number.isNaN(Number(elementKey))) {
      continue;
    }

    var element = el.elements[elementKey]
    var tagName = element.tagName.toLowerCase()
    // jscs:disable disallowImplicitTypeConversion
    if (!!element.name && element.attributes !== undefined && tagName !== "button") {
      // jscs:enable disallowImplicitTypeConversion
      var type = element.attributes.type

      if ((!type || type.value !== "checkbox" && type.value !== "radio") || element.checked) {
        // Build array of values to submit
        var values = []

        if (tagName === "select") {
          var opt

          for (var i = 0; i < element.options.length; i++) {
            opt = element.options[i]
            if (opt.selected) {
              values.push(opt.value || opt.text)
            }
          }
        }
        else {
          values.push(element.value)
        }

        for (var j = 0; j < values.length; j++) {
          requestParams.push({
            name: encodeURIComponent(element.name),
            value: encodeURIComponent(values[j])
          })
        }
      }
    }
  }

  return requestParams
}

function checkIfShouldAbort(virtLinkElement, options) {
  // Ignore external links.
  if (virtLinkElement.protocol !== window.location.protocol || virtLinkElement.host !== window.location.host) {
    return "external"
  }

  // Ignore click if we are on an anchor on the same page
  if (virtLinkElement.hash && virtLinkElement.href.replace(virtLinkElement.hash, "") === window.location.href.replace(location.hash, "")) {
    return "anchor"
  }

  // Ignore empty anchor "foo.html#"
  if (virtLinkElement.href === window.location.href.split("#")[0] + "#") {
    return "anchor-empty"
  }

  // if declared as a full reload, just normally submit the form
  if (options.currentUrlFullReload && virtLinkElement.href === window.location.href.split("#")[0]) {
    return "reload"
  }
}

var isDefaultPrevented = function(event) {
  return event.defaultPrevented || event.returnValue === false
}

module.exports = function(el) {
  var that = this

  el.setAttribute(attrState, "")

  on(el, "submit", function(event) {
    formAction.call(that, el, event)
  })

  on(el, "keyup", function(event) {
    if (event.keyCode === 13) {
      formAction.call(that, el, event)
    }
  }.bind(this))
}

},{"../events/on":15,"../util/clone":31}],23:[function(require,module,exports){
var on = require("../events/on")
var clone = require("../util/clone")

var attrState = "data-pjax-state"

var linkAction = function(el, event) {
  if (isDefaultPrevented(event)) {
    return
  }

  // Since loadUrl modifies options and we may add our own modifications below,
  // clone it so the changes don't persist
  var options = clone(this.options)

  var attrValue = checkIfShouldAbort(el, event)
  if (attrValue) {
    el.setAttribute(attrState, attrValue)
    return
  }

  event.preventDefault()

  // don’t do "nothing" if user try to reload the page by clicking the same link twice
  if (
    this.options.currentUrlFullReload &&
    el.href === window.location.href.split("#")[0]
  ) {
    el.setAttribute(attrState, "reload")
    this.reload()
    return
  }

  el.setAttribute(attrState, "load")

  options.triggerElement = el
  this.loadUrl(el.href, options)
}

function checkIfShouldAbort(el, event) {
  // Don’t break browser special behavior on links (like page in new window)
  if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return "modifier"
  }

  // we do test on href now to prevent unexpected behavior if for some reason
  // user have href that can be dynamically updated

  // Ignore external links.
  if (el.protocol !== window.location.protocol || el.host !== window.location.host) {
    return "external"
  }

  // Ignore anchors on the same page (keep native behavior)
  if (el.hash && el.href.replace(el.hash, "") === window.location.href.replace(location.hash, "")) {
    return "anchor"
  }

  // Ignore empty anchor "foo.html#"
  if (el.href === window.location.href.split("#")[0] + "#") {
    return "anchor-empty"
  }
}

var isDefaultPrevented = function(event) {
  return event.defaultPrevented || event.returnValue === false
}

module.exports = function(el) {
  var that = this

  el.setAttribute(attrState, "")

  on(el, "click", function(event) {
    linkAction.call(that, el, event)
  })

  on(el, "keyup", function(event) {
    if (event.keyCode === 13) {
      linkAction.call(that, el, event)
    }
  }.bind(this))
}

},{"../events/on":15,"../util/clone":31}],24:[function(require,module,exports){
var clone = require("../util/clone.js")
var newUid = require("../uniqueid.js")
var trigger = require("../events/trigger.js")

module.exports = function(responseText, request, href, options) {
  options = clone(options  || this.options)
  options.request = request

  // Fail if unable to load HTML via AJAX
  if (responseText === false) {
    trigger(document, "pjax:complete pjax:error", options)

    return
  }

  // push scroll position to history
  var currentState = window.history.state || {}
  window.history.replaceState({
      url: currentState.url || window.location.href,
      title: currentState.title || document.title,
      uid: currentState.uid || newUid(),
      scrollPos: [document.documentElement.scrollLeft || document.body.scrollLeft,
        document.documentElement.scrollTop || document.body.scrollTop]
    },
    document.title, window.location)

  // Check for redirects
  var oldHref = href
  if (request.responseURL) {
    if (href !== request.responseURL) {
      href = request.responseURL
    }
  }
  else if (request.getResponseHeader("X-PJAX-URL")) {
    href = request.getResponseHeader("X-PJAX-URL")
  }
  else if (request.getResponseHeader("X-XHR-Redirected-To")) {
    href = request.getResponseHeader("X-XHR-Redirected-To")
  }

  // Add back the hash if it was removed
  var a = document.createElement("a")
  a.href = oldHref
  var oldHash = a.hash
  a.href = href
  if (oldHash && !a.hash) {
    a.hash = oldHash
    href = a.href
  }

  this.state.href = href
  this.state.options = options

  try {
    this.loadContent(responseText, this.options)
  }
  catch (e) {
    trigger(document, "pjax:error", options)

    if (!this.options.debug) {
      if (console && console.error) {
        console.error("Pjax switch fail: ", e)
      }
      return this.latestChance(href)
    }
    else {
      throw e
    }
  }
}

},{"../events/trigger.js":16,"../uniqueid.js":30,"../util/clone.js":31}],25:[function(require,module,exports){
module.exports = function() {
  if (this.options.debug && console) {
    if (typeof console.log === "function") {
      console.log.apply(console, arguments)
    }
    // IE is weird
    else if (console.log) {
      console.log(arguments)
    }
  }
}

},{}],26:[function(require,module,exports){
var attrState = "data-pjax-state"

module.exports = function(el) {
  switch (el.tagName.toLowerCase()) {
    case "a":
      // only attach link if el does not already have link attached
      if (!el.hasAttribute(attrState)) {
        this.attachLink(el)
      }
      break

    case "form":
      // only attach link if el does not already have link attached
      if (!el.hasAttribute(attrState)) {
        this.attachForm(el)
      }
      break

    default:
      throw "Pjax can only be applied on <a> or <form> submit"
  }
}

},{}],27:[function(require,module,exports){
var updateQueryString = require("./util/update-query-string");

module.exports = function(location, options, callback) {
  options = options || {}
  var queryString
  var requestOptions = options.requestOptions || {}
  var requestMethod = (requestOptions.requestMethod || "GET").toUpperCase()
  var requestParams = requestOptions.requestParams || null
  var formData = requestOptions.formData || null;
  var requestPayload = null
  var request = new XMLHttpRequest()
  var timeout = options.timeout || 0

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(request.responseText, request, location, options)
      }
      else if (request.status !== 0) {
        callback(null, request, location, options)
      }
    }
  }

  request.onerror = function(e) {
    console.log(e)
    callback(null, request, location, options)
  }

  request.ontimeout = function() {
    callback(null, request, location, options)
  }

  // Prepare the request payload for forms, if available
  if (requestParams && requestParams.length) {
    // Build query string
    queryString = (requestParams.map(function(param) {return param.name + "=" + param.value})).join("&")

    switch (requestMethod) {
      case "GET":
        // Reset query string to avoid an issue with repeat submissions where checkboxes that were
        // previously checked are incorrectly preserved
        location = location.split("?")[0]

        // Append new query string
        location += "?" + queryString
        break

      case "POST":
        // Send query string as request payload
        requestPayload = queryString
        break
    }
  }
  else if (formData) {
    requestPayload = formData
  }

  // Add a timestamp as part of the query string if cache busting is enabled
  if (options.cacheBust) {
    location = updateQueryString(location, "t", Date.now())
  }

  request.open(requestMethod, location, true)
  request.timeout = timeout
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  request.setRequestHeader("X-PJAX", "true")
  request.setRequestHeader("X-PJAX-Selectors", JSON.stringify(options.selectors))

  // Send the proper header information for POST forms
  if (requestPayload && requestMethod === "POST") {
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  }

  request.send(requestPayload)

  return request
}

},{"./util/update-query-string":35}],28:[function(require,module,exports){
var forEachEls = require("./foreach-els")

var defaultSwitches = require("./switches")

module.exports = function(switches, switchesOptions, selectors, fromEl, toEl, options) {
  var switchesQueue = []

  selectors.forEach(function(selector) {
    var newEls = fromEl.querySelectorAll(selector)
    var oldEls = toEl.querySelectorAll(selector)
    if (this.log) {
      this.log("Pjax switch", selector, newEls, oldEls)
    }
    if (newEls.length !== oldEls.length) {
      throw "DOM doesn’t look the same on new loaded page: ’" + selector + "’ - new " + newEls.length + ", old " + oldEls.length
    }

    forEachEls(newEls, function(newEl, i) {
      var oldEl = oldEls[i]
      if (this.log) {
        this.log("newEl", newEl, "oldEl", oldEl)
      }

      var callback = (switches[selector]) ?
        switches[selector].bind(this, oldEl, newEl, options, switchesOptions[selector]) :
        defaultSwitches.outerHTML.bind(this, oldEl, newEl, options)

      switchesQueue.push(callback)
    }, this)
  }, this)

  this.state.numPendingSwitches = switchesQueue.length

  switchesQueue.forEach(function(queuedSwitch) {
    queuedSwitch()
  })
}

},{"./foreach-els":18,"./switches":29}],29:[function(require,module,exports){
var on = require("./events/on.js")

module.exports = {
  outerHTML: function(oldEl, newEl) {
    oldEl.outerHTML = newEl.outerHTML
    this.onSwitch()
  },

  innerHTML: function(oldEl, newEl) {
    oldEl.innerHTML = newEl.innerHTML

    if (newEl.className === "") {
      oldEl.removeAttribute("class")
    }
    else {
      oldEl.className = newEl.className
    }

    this.onSwitch()
  },

  switchElementsAlt: function(oldEl, newEl) {
    oldEl.innerHTML = newEl.innerHTML

    // Copy attributes from the new element to the old one
    if (newEl.hasAttributes()) {
      var attrs = newEl.attributes
      for (var i = 0; i < attrs.length; i++) {
        oldEl.attributes.setNamedItem(attrs[i].cloneNode())
      }
    }

    this.onSwitch()
  },

  // Equivalent to outerHTML(), but doesn't require switchElementsAlt() for <head> and <body>
  replaceNode: function(oldEl, newEl) {
    oldEl.parentNode.replaceChild(newEl, oldEl)
    this.onSwitch()
  },

  sideBySide: function(oldEl, newEl, options, switchOptions) {
    var forEach = Array.prototype.forEach
    var elsToRemove = []
    var elsToAdd = []
    var fragToAppend = document.createDocumentFragment()
    var animationEventNames = "animationend webkitAnimationEnd MSAnimationEnd oanimationend"
    var animatedElsNumber = 0
    var sexyAnimationEnd = function(e) {
          if (e.target !== e.currentTarget) {
            // end triggered by an animation on a child
            return
          }

          animatedElsNumber--
          if (animatedElsNumber <= 0 && elsToRemove) {
            elsToRemove.forEach(function(el) {
              // browsing quickly can make the el
              // already removed by last page update ?
              if (el.parentNode) {
                el.parentNode.removeChild(el)
              }
            })

            elsToAdd.forEach(function(el) {
              el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
              el.removeAttribute("data-pjax-classes")
            })

            elsToAdd = null // free memory
            elsToRemove = null // free memory

            // this is to trigger some repaint (example: picturefill)
            this.onSwitch()
          }
        }.bind(this)

    switchOptions = switchOptions || {}

    forEach.call(oldEl.childNodes, function(el) {
      elsToRemove.push(el)
      if (el.classList && !el.classList.contains("js-Pjax-remove")) {
        // for fast switch, clean element that just have been added, & not cleaned yet.
        if (el.hasAttribute("data-pjax-classes")) {
          el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
          el.removeAttribute("data-pjax-classes")
        }
        el.classList.add("js-Pjax-remove")
        if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
          switchOptions.callbacks.removeElement(el)
        }
        if (switchOptions.classNames) {
          el.className += " " + switchOptions.classNames.remove + " " + (options.backward ? switchOptions.classNames.backward : switchOptions.classNames.forward)
        }
        animatedElsNumber++
        on(el, animationEventNames, sexyAnimationEnd, true)
      }
    })

    forEach.call(newEl.childNodes, function(el) {
      if (el.classList) {
        var addClasses = ""
        if (switchOptions.classNames) {
          addClasses = " js-Pjax-add " + switchOptions.classNames.add + " " + (options.backward ? switchOptions.classNames.forward : switchOptions.classNames.backward)
        }
        if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
          switchOptions.callbacks.addElement(el)
        }
        el.className += addClasses
        el.setAttribute("data-pjax-classes", addClasses)
        elsToAdd.push(el)
        fragToAppend.appendChild(el)
        animatedElsNumber++
        on(el, animationEventNames, sexyAnimationEnd, true)
      }
    })

    // pass all className of the parent
    oldEl.className = newEl.className
    oldEl.appendChild(fragToAppend)
  }
}

},{"./events/on.js":15}],30:[function(require,module,exports){
module.exports = (function() {
  var counter = 0
  return function() {
    var id = ("pjax" + (new Date().getTime())) + "_" + counter
    counter++
    return id
  }
})()

},{}],31:[function(require,module,exports){
module.exports = function(obj) {
  /* istanbul ignore if */
  if (null === obj || "object" !== typeof obj) {
    return obj
  }
  var copy = obj.constructor()
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = obj[attr]
    }
  }
  return copy
}

},{}],32:[function(require,module,exports){
module.exports = function contains(doc, selectors, el) {
  for (var i = 0; i < selectors.length; i++) {
    var selectedEls = doc.querySelectorAll(selectors[i])
    for (var j = 0; j < selectedEls.length; j++) {
      if (selectedEls[j].contains(el)) {
        return true
      }
    }
  }

  return false
}

},{}],33:[function(require,module,exports){
module.exports = function(target) {
  if (target == null) {
    return null
  }

  var to = Object(target)

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]

    if (source != null) {
      for (var key in source) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          to[key] = source[key]
        }
      }
    }
  }
  return to
}

},{}],34:[function(require,module,exports){
module.exports = function() {}

},{}],35:[function(require,module,exports){
module.exports = function(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i")
  var separator = uri.indexOf("?") !== -1 ? "&" : "?"
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2")
  }
  else {
    return uri + separator + key + "=" + value
  }
}

},{}],36:[function(require,module,exports){
var Pjax = require('pjax')
var Nprogress = require('nprogress')
var onmount = require('onmount')
var toggleClass = require('dom101/toggle-class')
var ready = require('dom101/ready')
var Scrolltrack = require('./scrolltrack')
var Scrollclass = require('./scrollclass')

/*
 * pjax/nprogress
 */

// void (function () {
//   ready(function () {
//     new Pjax({ // eslint-disable-line
//       selectors: ['.body', '.toc-menu', 'title']
//     })
//   })

//   document.addEventListener('pjax:send', function () {
//     Nprogress.start()
//   })

//   document.addEventListener('pjax:error', function () {
//     Nprogress.done()
//   })

//   document.addEventListener('pjax:complete', function () {
//     Nprogress.done()
//     window.location.href = window.location.href.replace(window.location.search, '')
//   })
// }())

/*
 * menu toggle
 */

onmount('.js-menu-toggle', function () {
  this.addEventListener('click', function () {
    toggleClass(document.body, '-menu-visible')
  })
})

/*
 * onmount
 */

void (function () {
  ready(function () {
    onmount()
  })

  document.addEventListener('pjax:complete', function () {
    onmount()
  })
}())

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

void (function () {
  onmount('.footer-nav', function (b) {
    b.sc = Scrollclass(this, {
      className: '-expanded',
      onscroll: function (y) {
        return this.maxScroll - y < 88
      }
    })
  }, function (b) {
    b.sc.destroy()
  })
}())

void (function () {
  onmount('.header-nav', function (b) {
    b.sc = Scrollclass(this, {
      className: '-expanded',
      onscroll: function (y) { return y < 40 }
    })
  }, function (b) {
    b.sc.destroy()
  })
}())

// Custom scripts

// Polyfills
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


// Custom menu toggle 
function chaptersToggle () {
  var chapters = document.querySelectorAll('.menu-item.-level-1.-parent > .title')

  chapters.forEach(addEventListener)
  chapters.forEach(openActive)

  function openActive(el) {
    var active = el.parentNode.querySelector('.-active')
    if (active) el.parentNode.classList.add('-open')
  }

  function addEventListener (el) {
    el.removeEventListener('click', handleClick.bind(el))
    el.addEventListener('click', handleClick.bind(el))
  }

  function handleClick(e) {
    this.parentNode.classList.toggle('-open')
  }
}


// Add WP Icon
function addWPIcon () {
  var githubLink = document.querySelector('.iconlink')
  var wpLink = document.createElement('a')
  wpLink.classList.add('iconlink')
  wpLink.setAttribute('href', 'https://make.wordpress.org/tide/')
  wpLink.setAttribute('data-title', 'make.wordpress.org/tide')
  wpLink.innerHTML = '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M10 500a490 490 0 1 0 980 0 490 490 0 0 0-980 0zm38 0c0-66 14-128 39-184l216 591A452 452 0 0 1 48 500zm452 452c-44 0-87-6-128-18l136-394 139 380 3 7c-47 16-97 25-150 25zm366-460a427 427 0 0 0 31-209 450 450 0 0 1-170 608l139-399zm-98-140c17 30 37 69 37 125 0 39-11 87-34 146l-45 151-164-486c28-1 52-4 52-4 24-3 22-39-3-38 0 0-73 6-120 6-45 0-119-6-119-6-25-1-28 36-3 38l47 4 71 193-99 297-165-490c27-1 52-4 52-4 24-3 21-39-3-38 0 0-73 6-121 6h-29a452 452 0 0 1 683-85l-5-1c-45 0-76 39-76 80 0 38 21 69 44 106z"/></svg>'

  githubLink.parentElement.appendChild(wpLink)
}


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
    ctx.fillStyle = `rgba(0,0,0,${this.alpha})`
    ctx.fill()
  }
  
  function animate () {
    if (isStop) return
    ++tick
    ctx.clearRect(0,0,width,height)
  
    points.forEach((point, i) => {
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


// Init everything
document.addEventListener('DOMContentLoaded', function() {
  var waves
  
  function createWaves() {
    var canvas = document.getElementById('canvas')
    if (waves) waves.stop()
    if (matchMedia('(min-width: 959px)').matches && canvas) {
      waves = new Waves( canvas )
      waves.run()
    }
  }
  
  function handlePageLoad () {
    createWaves()
    addWPIcon()
    chaptersToggle()
    var apiCheck = document.querySelector('[data-api-check]')
    if (apiCheck) new ApiCheck( apiCheck )
  }
  
  window.addEventListener('load', handlePageLoad)
  document.addEventListener('pjax:complete', handlePageLoad)
  window.addEventListener('resize', createWaves)
})

},{"./scrollclass":37,"./scrolltrack":38,"dom101/ready":6,"dom101/toggle-class":9,"nprogress":10,"onmount":11,"pjax":12}],37:[function(require,module,exports){
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

},{"debounce":1,"dom101/document-height":3,"dom101/scroll-top":8,"dom101/toggle-class":9}],38:[function(require,module,exports){
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

},{"debounce":1,"dom101/document-height":3,"dom101/each":4,"dom101/scroll-top":8,"dom101/toggle-class":9}]},{},[36]);
