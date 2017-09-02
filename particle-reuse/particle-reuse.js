window.onload = function () {
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    velocity = 10,
    particles = [],
    num = 100

  for (var i = 0; i < num; i += 1) {
    var p = particle.create(width / 2, height, Math.random() * 8 + 5, -Math.PI /
      2 + (Math.random() * 0.2 - 0.1), 0.1)
    p.radius = Math.random() * 10 + 2
    particles.push(p)
  }
  update()

  function update () {
    context.clearRect(0, 0, width, height)
    console.log(particles.length)
    for (var i = 0; i < particles.length; i += 1) {
      p = particles[i]
      reuseDeadParticles(p)
      p.update()

      context.beginPath()
      context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI *
        2, false)
      context.fill()
    }

    requestAnimationFrame(update)
  }

  function reuseDeadParticles (p) {
    if (p.position.getX() - p.radius > width ||
      p.position.getX() + p.radius < 0 ||
      p.position.getY() - p.radius > height ||
      p.position.getY() + p.radius < 0) {
      p.position.setX(width / 2)
      p.position.setY(height)
      p.velocity.setLength(Math.random() * 8 + 5)
      p.velocity.setAngle(-Math.PI / 2 + Math.random() * 0.2 - 0.1)
    }
  }
}

