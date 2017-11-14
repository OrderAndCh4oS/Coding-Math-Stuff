window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        mesh = [],
        angle = 0.75,
        length = 30,
        spacer = 10,
        modifier = -0.2,
        pointCount = width / length,
        lineCount = height / spacer

    for (var i = 0; i < lineCount; i++) {
        var arms = []
        arms.push(Arm.create(0, i * spacer, length, angle))
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
        for (var i = 0; i < lineCount; i++) {
            for (var j = 0; j < pointCount; j++) {
                mesh[i][j].angle = Math.cos(angle) * modifier
                if (j > 0) {
                    mesh[i][j].x = mesh[i][j - 1].getEndX()
                    mesh[i][j].y = mesh[i][j - 1].getEndY()
                }
                mesh[i][j].render(context)
            }
        }
        angle += 0.005

        requestAnimationFrame(render)
    }
}