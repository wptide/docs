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


// Check API component
function ApiCheck (el) {
  var form = el.querySelector('form')
  var input = el.querySelector('input[type=text]')

  form.addEventListener('submit', handleSubmit)

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

  function showResponse (msg) {
    removeResponse()
    var pre = document.createElement('pre')
    var closeLink = document.createElement('a')
    pre.classList.add('api-check__pre')
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
        if(req.status == 200) showResponse(JSON.parse(req.responseText))
        else showResponse('The entered API endpoint is invalid\n')
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
  var height = canvas.height = window.innerHeight
  var width = canvas.width = window.innerWidth - 400

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
  var canvas = document.getElementById('canvas')
  var apiCheck = document.querySelector('[data-api-check]')
  var waves

  function createWaves() {
    if (waves) waves.stop()
    if (matchMedia('(min-width: 959px)').matches && canvas) {
      waves = new Waves(canvas)
      waves.run()
    }
  }

  window.addEventListener('load', function() {
    createWaves()
    if (apiCheck) new ApiCheck(apiCheck)
  })

  window.addEventListener('resize', createWaves)
})
