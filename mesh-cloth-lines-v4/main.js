window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        mesh = [],
        angle = 97,
        length = 25,
        spacer = 8,
        modifier = -0.115,
        pointCount = (width * 1.5) / length,
        lineCount = height / 3 / spacer,
        kinks = [],
        kink = 100,
        jilt = 0,
        inputAngle,
        inputKink,
        inputJilt

    inputAngle = document.getElementById('angle')
    inputModifier = document.getElementById('modifier')
    inputKink = document.getElementById('kink')
    inputJilt = document.getElementById('jilt')

    inputAngle.addEventListener('change', function () {
        angle = parseInt(inputAngle.value)
        render()
    })
    inputModifier.addEventListener('change', function () {
        modifier = parseFloat(inputModifier.value)
        render()
    })
    inputKink.addEventListener('change', function () {
        kink = parseFloat(inputKink.value)
        render()
    })
    inputJilt.addEventListener('change', function () {
        jilt = parseFloat(inputJilt.value)
        render()
    })

    for (var i = 0; i < lineCount; i++) {
        var arms = []
        arms.push(Arm.create(0, i * spacer + (height / 3 - height / 4), length,
            angle))
        for (var j = 1; j < pointCount; j++) {
            arms.push(
                Arm.create(arms[j - 1].getEndX(), arms[j - 1].getEndY(), length,
                    3))
            arms[j].parent = arms[j - 1]
        }
        mesh.push(arms)
    }

    render()

    function render () {
        context.clearRect(0, 0, width, height)
        for (var k = 0; k < pointCount; k++) {
            kinks.push(Math.random() * kink)
        }
        for (var i = 0; i < lineCount; i++) {
            for (var j = 0; j < pointCount; j++) {
                jilt += jilt
                mesh[i][j].angle = Math.sin(angle + kinks[j] - kink / 2 +
                    jilt) * modifier
                if (j > 0) {
                    mesh[i][j].x = mesh[i][j - 1].getEndX()
                    mesh[i][j].y = mesh[i][j - 1].getEndY()
                }
                mesh[i][j].render(context)
            }
        }

        angle += 0.005
        //requestAnimationFrame(render)
    }
}