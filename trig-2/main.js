window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var centerY = height * 0.5,
        centerX = width * 0.5,
        offset = height * 0.4,
        // start size of radius
        baseRadius = 100,
        // offset cannot be greater than baseRadius (.25 will go from 75 to 125)
        offsetRadius = baseRadius * 0.25,
        baseAlpha = 0.5,
        offsetAlpha = 0.5,
        speed = 0.1,
        angle = 0;

    render();

    function render() {
        // radius is equal to sine of offset at current angle
        var y = centerY + Math.sin(angle) * offset,
            radius = baseRadius + Math.cos(angle) * offsetRadius,
            alpha = baseAlpha + Math.cos(angle) * offsetAlpha;

        context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(centerX, y, radius, 0, Math.PI * 2, false);
        context.fill();

        // each render increase angle by speed
        angle += speed;

        // animate frame
        requestAnimationFrame(render);
    }
};

