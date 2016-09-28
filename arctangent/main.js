window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        arrowX = width / 2,
        arrowY = height /2,
        dX, dY,
        angle = 0;

        render();

        function render() {
            context.clearRect(0, 0, width, height);

            context.save();
            context.translate(arrowX, arrowY);
            context.rotate(angle);

            context.beginPath();
            context.moveTo(20, 0);
            context.lineTo(-20, 0);
            context.moveTo(20, 0);
            context.lineTo(10, -10);
            context.moveTo(20, 0);
            context.lineTo(10, 10);
            context.stroke();

            context.restore();
            requestAnimationFrame(render);
        }

        document.body.addEventListener("mousemove", function(event) {
            dX = event.clientX - arrowX;
            dY = event.clientY - arrowY;
            angle = Math.atan2(dY, dX);
        });
};

