window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var centerY = height / 2,
        centerX = width / 2,
        xRadius = (width / 4),
        yRadius = (height / 4),
        baseXSpeed = 0.1 / 3,
        baseYSpeed = 0.132 / 3,
        xSpeed = baseXSpeed,
        ySpeed = baseYSpeed,
        xAngle = 0,
        yAngle = 0,
        x, y;

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        context.moveTo(x,y);
        for (var i = 0; i < 300; i++) {
            var thisXAngle = (baseXSpeed * i) + xAngle;
            var thisYAngle = (baseYSpeed * i) + yAngle;
            x = centerX + Math.cos(thisXAngle) * xRadius;
            y = centerY + Math.sin(thisYAngle) * yRadius;
            context.beginPath();
            context.arc(x, y, 50, 0, Math.PI * 2, false);
            context.fill();
            xAngle += xSpeed;
            yAngle += ySpeed;
        }
        requestAnimationFrame(render);
    }
};

