window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    context.lineWidth = 0.15;

    var a = Math.random() * 4 - 2;
    var b = Math.random() * 4 - 2;
    var c = Math.random() * 4 - 2;
    var d = Math.random() * 4 - 2;

    var p = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
    };

    function getValue (x, y) {
        // clifford attractor
        // http://paulbourke.net/fractals/clifford/

        // scale down x and y
        var scale = 0.005;
        x = (x - width / 2) * scale;
        y = (y - height / 2) * scale;

        // attactor gives new x, y for old one.
        var x1 = Math.sin(a * y) + c * Math.cos(a * x);
        var y1 = Math.sin(b * x) + d * Math.cos(b * y);

        // find angle from old to new. that's the value.
        return Math.atan2(y1 - y, x1 - x);
    }

    function render () {
        var value = getValue(p.x, p.y);
        p.vx += Math.cos(value) * 0.3;
        p.vy += Math.sin(value) * 0.3;

        context.beginPath();
        context.moveTo(p.x, p.y);

        p.x += p.vx;
        p.y += p.vy;
        context.lineTo(p.x, p.y);
        context.stroke();

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.y < 0) p.y = height;

        requestAnimationFrame(render);

    }

    render();
};