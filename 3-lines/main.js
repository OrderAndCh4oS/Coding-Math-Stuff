function createLine (x1, y1, speed, angle, i) {
  i = typeof i === 'undefined' ? 0 : i;
  return {
    x: x1,
    y: y1,
    start: vector.create(x1, y1),
    end: vector.create(x1, y1),
    speed: speed,
    angle: angle,
    i: i
  }
}

function updateLine (line) {
  line.i++;
  if (line.i < 0) {
    return line
  }
  nextPoint = vector.create(line.start.getX(), line.start.getY());
  nextPoint.setLength(line.speed);
  nextPoint.setAngle(line.angle);
  if (line.i < 50) {
    line.end.addTo(nextPoint)
  } else if (line.i < 100) {
    line.start.addTo(nextPoint)
  } else {
    line = createLine(line.x, line.y, line.speed, line.angle);
    return line
  }
  return line
}

function drawLine (context, line) {
  context.moveTo(line.start.getX(), line.start.getY());
  context.lineTo(line.end.getX(), line.end.getY())
}

window.onload = function () {
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    arrowX = width / 2,
    arrowY = height / 2,
    angle = -42 * Math.PI / 180,
    line1 = createLine(0, 0, 10, angle, 0),
    line2 = createLine(20, 0, 10, angle, -20),
    line3 = createLine(40, 0, 10, angle, -40);

  render();

  function render () {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(arrowX, arrowY);
    context.beginPath();
    context.lineWidth=10;
    line1 = updateLine(line1);
    drawLine(context, line1);
    line2 = updateLine(line2);
    drawLine(context, line2);
    line3 = updateLine(line3);
    drawLine(context, line3);
    context.stroke();

    context.restore();
    requestAnimationFrame(render)
  }
};