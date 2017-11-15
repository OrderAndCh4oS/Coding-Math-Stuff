window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        mesh = [],
        angle = 97,
        length = 25,
        spacer = 8,
        modifier = -0.05,
        pointCount = (width * 1.5) / length,
        lineCount = height / 3 / spacer,
        kinks = [],
        kink = 100,
        jilt = 0;

    for (var i = 0; i < lineCount; i++) {
        var arms = [];
        arms.push(Arm.create(0, i * spacer + (height / 2 - height / 4), length,
            angle));
        for (var j = 1; j < pointCount; j++) {
            arms.push(
                Arm.create(arms[j - 1].getEndX(), arms[j - 1].getEndY(), length,
                    3));
            arms[j].parent = arms[j - 1];
            arms[j].jilt = jilt += Math.random() * 0.0012
            console.log("Jilt: " + arms[j].jilt)
        }
        mesh.push(arms)
    }

    render();

    for (var k = 0; k < pointCount; k++) {
        kinks.push(Math.random() * kink)
    }

    function render () {
        context.clearRect(0, 0, width, height);

        for (var i = 0; i < lineCount; i++) {
            for (var j = 0; j < pointCount; j++) {
                mesh[i][j].angle = Math.sin(angle + kinks[j] - kink / 2 + mesh[i][j].jilt) * modifier;
                if (j > 0) {
                    mesh[i][j].x = mesh[i][j - 1].getEndX();
                    mesh[i][j].y = mesh[i][j - 1].getEndY()
                }
                mesh[i][j].render(context);
                // mesh[i][j].jilt -= 0.001
            }
        }
        console.log("Angle: " + angle);
        console.log("Modifier: " + modifier);
        console.log("Kinks: " + kinks);
        console.log("Jilt2: " + jilt);
        angle += 0.005;
        requestAnimationFrame(render)
    }
};