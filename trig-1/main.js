window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    context.translate(10, height/2);
    /**
     * Creates a Sine Wave
     */
    for(var angle = 0; angle < Math.PI * 2; angle += 0.01) {
        var x = angle * 200,
            y = Math.sin(angle) * 200;

        context.fillRect(x, y, 5, 5);

    }
};

