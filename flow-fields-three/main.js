window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var count = 50000;

    var a = Math.random() * 4 - 2;
    var b = Math.random() * 4 - 2;
    var c = Math.random() * 4 - 2;
    var d = Math.random() * 4 - 2;

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

    context.lineWidth = 0.15;

    for (var i = 0; i < count; i++) {
        var x = Math.random() * width,
            y = Math.random() * height;

        var value = getValue(x, y);

        context.save();
        context.translate(x, y);

        render(value);

        context.restore();
    }

    function render (value) {

        context.rotate(value);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(Math.random() * 80 + 15, 1);
        context.stroke();
    }
};