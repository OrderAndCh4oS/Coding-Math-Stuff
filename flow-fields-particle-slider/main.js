window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    context.lineWidth = 0.25;

    var a = -1.5;
    var b = -3.3; // [-2.8, -5.3], [0.1, 0.7], [2.2, 2.9] good
    var c = -1.4;
    var d = -1.4;

    var inputA = document.getElementById('a');

    inputA.addEventListener('change', function () {
        console.log('asiofho');
        a = parseInt(inputA.value);
        render()
    });

    var inputB = document.getElementById('b');

    inputB.addEventListener('change', function () {
        b = parseInt(inputB.value);
        render()
    });

    var inputC = document.getElementById('c');

    inputC.addEventListener('change', function () {
        c = parseInt(inputC.value);
        render()
    });

    var inputD = document.getElementById('d');

    inputD.addEventListener('change', function () {
        d = parseInt(inputD.value);
        render()
    });

    function getValue(x, y) {
        // clifford attractor
        // http://paulbourke.net/fractals/clifford/

        // scale down x and y
        var scale = 0.0005;
        x = ((x - width) - (Math.random() * 2 - 4)) * scale;
        y = ((y - height) - (Math.random() * 2 - 4)) * scale;

        // attactor gives new x, y for old one.
        var x1 = Math.sin(a * y) + c * Math.cos(a * x);
        var y1 = Math.sin(b * x) + d * Math.cos(b * y);

        // find angle from old to new. that's the value.
        return Math.atan2(y1 - y, x1 - x);
    }

    function render() {
        context.clearRect(0, 0, width, height);
        var points = [];
        for (var y = 0; y < height; y += 12) {
            points.push({
                x: 0,
                y: y,
                vx: 0,
                vy: 0,
            });
        }
        for (var j = 0; j < 1000; j++) {
            for (var i = points.length - 1; i >= 0; i--) {

                var value = getValue(points[i].x, points[i].y);
                points[i].vx += Math.cos(value) * 75;
                points[i].vy += Math.sin(value) * 50;

                context.beginPath();
                context.moveTo(points[i].x, points[i].y);

                points[i].x += points[i].vx;
                points[i].y += points[i].vy;
                context.lineTo(points[i].x, points[i].y);
                context.stroke();

                points[i].vx *= 0.99;
                points[i].vy *= 0.99;

                if (
                    points[i].x > width ||
                    points[i].y > height ||
                    points[i].x < 0 ||
                    points[i].y < 0
                ) {
                    points.splice(i, 1);
                }
            }
        }
    }

    render();
};