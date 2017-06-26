window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = shipClass.create(width / 2, height / 2, 0, 0);

        ship.friction = 0.99;

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        ship.update();

        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(ship.angle);
        ship.accelerate(ship.thrust);

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if (ship.thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-15, 0);
        }
        context.stroke();

        context.restore();

        if (ship.position.getX() > width) {
            ship.position.setX(0);
        }
        if (ship.position.getX() < 0) {
            ship.position.setX(width);
        }
        if (ship.position.getY() > height) {
            ship.position.setY(0);
        }
        if (ship.position.getY() < 0) {
            ship.position.setY(height);
        }
        requestAnimationFrame(update);
    }
};
