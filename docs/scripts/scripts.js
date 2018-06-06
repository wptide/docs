// Polyfills
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
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
