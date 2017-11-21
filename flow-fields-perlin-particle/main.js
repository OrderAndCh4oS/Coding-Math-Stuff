window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    noise.seed(Math.random());
    context.lineWidth = 0.1;

    var points = [];
    for (var y = 0; y < height; y += 5) {
        points.push({
            x: 0,
            y: y,
            vx: 0,
            vy: 0,
        });
    }

    function getValue(x, y) {
        var scale = 0.01;
        return noise.perlin2(x * scale, y * scale) * Math.PI * 2;
    }

    function render () {
        for (var i = points.length - 1; i >= 0; i--) {

            var value = getValue(points[i].x, points[i].y);
            points[i].vx += Math.cos(value) * 0.1;
            points[i].vy += Math.sin(value) * 0.1;

            context.beginPath();
            context.moveTo(points[i].x, points[i].y);

            points[i].x += points[i].vx;
            points[i].y += points[i].vy;
            context.lineTo(points[i].x, points[i].y);
            context.stroke();

            points[i].vx *= 0.99;
            points[i].vy *= 0.99;

            if (points[i].x > width) points[i].x = 0;
            if (points[i].y > height) points[i].y = 0;
            if (points[i].x < 0) points[i].x = width;
            if (points[i].y < 0) points[i].y = height;
        }


        requestAnimationFrame(render);

    }

    render();
};