window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var count = 50000;

    function getValue () {
        return (Math.sin(x * 0.02) * Math.cos(y * 0.01)) * Math.PI * 2 / 8;
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