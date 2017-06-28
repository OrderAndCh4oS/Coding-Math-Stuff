window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ships = [],
        deadShips = [];

    for (var i = 50; i > 0; i--) {
        var ship = shipClass.create(Math.random() * (width), Math.random() * (height), 0, 0);
        ship.friction = 0.99;
        ships.push(ship);
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        for (var i = ships.length - 1; i >= 0; i--) {
            var ship = ships[i];
            var hit = false;
            for (var j = i - 1; j >= 0; j--) {
                if (ship.distanceTo(ships[j]) < 10) {
                    if (Math.random > 0.5) {
                        deadShips.push(j);
                    } else {
                        deadShips.push(i);
                    }
                }
            }
            if (!hit) {
                ship.update();
                context.save();
                context.translate(ship.position.getX(), ship.position.getY());
                context.rotate(ship.angle);
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
            } else {}
        }
        deadShips.sort();
        for (var k = deadShips.length - 1; k >= 0; k--) {
            var index = deadShips[k];
            context.save();
            console.log(deadShips);
            context.translate(ships[index].position.getX(), ships[index].position.getY());
            context.arc(0, 0, 20, 0, 2 * Math.PI);
            context.fillStyle = "red";
            context.fill();
            context.closePath();
            context.restore();
            ships.splice(index, 1);
            deadShips.pop();
        }
        requestAnimationFrame(update);
    }
};
