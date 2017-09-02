window.onload = function () {
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight

  var centerY = height / 2,
    centerX = width / 2,
    radius = 200,
    angle = 0,
    // xRadius = 200,
    // yRadius = 100,
    // xSpeed = 0.1,
    // ySpeed = 0.132,
    // xAngle = 0,
    // yAngle = 0,
    numObjects = 10,
    slice = Math.PI * 2 / numObjects,
    x, y

  render()

  function render () {
    context.clearRect(0, 0, width, height)

    // Circle
    // x = centerX + Math.cos(angle) * radius;
    // y = centerY + Math.sin(angle) * radius;
    // Ellipse
    // x = centerX + Math.cos(angle) * xRadius;
    // y = centerY + Math.sin(angle) * yRadius;
    // Lissajous Curve
    // x = centerX + Math.cos(xAngle) * xRadius;
    // y = centerY + Math.sin(yAngle) * yRadius;

    // context.beginPath();
    // context.arc(x, y, 10, 0, Math.PI * 2, false);
    // context.fill();

    // each render increase angle by speed
    // xAngle += xSpeed;
    // yAngle += ySpeed;

    // animate frame
    // requestAnimationFrame(render);
    for (var i = 0; i < numObjects; i++) {
      angle = i * slice
      x = centerX + Math.cos(angle) * radius
      y = centerY + Math.sin(angle) * radius

      context.beginPath()
      context.arc(x, y, 10, 0, Math.PI * 2, false)
      context.fill()
    }
  }
}

