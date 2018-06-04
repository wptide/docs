// Waves for homepage hero section

function Waves (canvas) {
  var ctx = canvas.getContext('2d')
  var parentRect = canvas.parentNode.getBoundingClientRect()
  var height = canvas.height = window.innerHeight
  var width = canvas.width = window.innerWidth - 400

  // Stage
  var fov = 1024
  var zRows = width / 60
  var xRows = width / 50
  var spacing = width / xRows
  var yBase = 800
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

var waves

function createWaves() {
  var canvas = document.getElementById('canvas')
  waves = new Waves(canvas)
  waves.run()
}

window.addEventListener('load', createWaves);
window.addEventListener('resize', function () {
  waves.stop()
  waves = new Waves(canvas)
  waves.run()
});
