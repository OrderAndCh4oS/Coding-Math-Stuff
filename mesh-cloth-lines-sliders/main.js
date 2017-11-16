function setKinks (pointCount, kink) {
    var kinks = []
    for (var k = 0; k < pointCount; k++) {
        kinks.push(Math.random() * kink)
    }
    return kinks
}

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
        jilt = 0.006,
        jiltMod = 0.0012,
        inputLength,
        inputAngle,
        inputModifier,
        inputKink,
        inputJilt;

    inputLength = document.getElementById('length');
    inputAngle = document.getElementById('angle');
    inputModifier = document.getElementById('modifier');
    inputKink = document.getElementById('kink');
    inputJilt = document.getElementById('jilt');

    inputLength.addEventListener('change', function () {
        length = parseInt(inputLength.value);
        pointCount = (width * 1.5) / length;
        kinks = setKinks(pointCount, kink)
        render()
    });
    inputAngle.addEventListener('change', function () {
        angle = parseInt(inputAngle.value);
        render()
    });
    inputModifier.addEventListener('change', function () {
        modifier = parseFloat(inputModifier.value);
        render()
    });
    inputKink.addEventListener('change', function () {
        kink = parseFloat(inputKink.value);
        kinks = setKinks(pointCount, kink)
        render()
    });
    inputJilt.addEventListener('change', function () {
        jiltMod = parseFloat(inputJilt.value);
        render()
    });

    kinks = setKinks(pointCount, kink)

    render();

    function render () {
        context.clearRect(0, 0, width, height);
        mesh = [];
        jilt = 0;
        for (var i = 0; i < lineCount; i++) {
            var arms = [];
            arms.push(
                Arm.create(0, i * spacer + (height / 2 - height / 6), length,
                    angle));
            for (var j = 1; j < pointCount; j++) {
                arms.push(
                    Arm.create(arms[j - 1].getEndX(), arms[j - 1].getEndY(), length,
                        3));
                arms[j].parent = arms[j - 1];
                arms[j].jilt = Math.cos(jilt += jiltMod)
            }
            mesh.push(arms)
        }
        for (var i = 0; i < lineCount; i++) {
            for (var j = 0; j < pointCount; j++) {
                mesh[i][j].angle = Math.sin(angle + kinks[j] - kink / 2 + mesh[i][j].jilt) * modifier;
                if (j > 0) {
                    mesh[i][j].x = mesh[i][j - 1].getEndX();
                    mesh[i][j].y = mesh[i][j - 1].getEndY()
                }
                mesh[i][j].render(context);
                // mesh[i][j].jilt -= 0.008
            }
        }
        //requestAnimationFrame(render)
    }
};