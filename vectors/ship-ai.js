window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ships = [],
        deadShips = [];

    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }

    for (var i = 100; i > 0; i--) {
        var ship = shipClass.create(Math.random() * (width), Math.random() * (height), (Math.random() * 0.2) + 0.1, (Math.random() * 0.5) + 0.5);
        ship.friction = 0.99;
        switch (i % 6) {
            case 0:
                ship.colour = "#ff3243";
                break;
            case 1:
                ship.colour = "#ff4fa9";
                break;
            case 2:
                ship.colour = "#61ff83";
                break;
            case 3:
                ship.colour = "#6ddfff";
                break;
            case 4:
                ship.colour = "#4b6aff";
                break;
            case 5:
                ship.colour = "#ffe76a";
                break;
        }
        ship.id = i;
        ship.angle = i % 2 === 0 ? 0 : Math.PI;
        ships.push(ship);
    }

    update();

    function howClose(x, y) {
        return Math.atan2(Math.sin(x - y), Math.cos(x - y));
    }

    function update() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);
        for (var i = ships.length - 1; i >= 0; i--) {
            var ship = ships[i],
                hit = false,
                angleToNearest = 0,
                nearest = false;

            for (var j = ships.length - 1; j >= 0; j--) {
                if (ships[j].colour !== ship.colour) {
                    var distance = ship.distanceTo(ships[j]);
                    if (!nearest && i !== j) {
                        angleToNearest = ships[j].angleToPredictedLocation(ship);
                        nearest = distance;
                    }
                    if (distance < nearest && i !== j) {
                        angleToNearest = ships[j].angleToPredictedLocation(ship);
                        nearest = distance;
                    }
                    if (distance < 12 && i !== j && !isInArray(i, deadShips) && !isInArray(j, deadShips)) {
                        if (Math.random >= 0.5) {
                            deadShips.push(j);
                            ships[i].kills++;
                        } else {
                            deadShips.push(i);
                            ships[j].kills++;
                        }
                    }
                }
            }

            switch (true) {
                case (howClose(ship.angle, angleToNearest) >= 0.6):
                    ship.turnLeft(ship.turningSpeed * 0.1);
                    break;
                case (howClose(ship.angle, angleToNearest) >= 0.4):
                    ship.turnLeft(ship.turningSpeed * 0.1 / 3 * 2);
                    break;
                case (howClose(ship.angle, angleToNearest) >= 0.2):
                    ship.turnLeft(ship.turningSpeed * 0.1 / 3);
                    break;
                case (howClose(ship.angle, angleToNearest) > 0):
                    ship.turnLeft(howClose(ship.angle, angleToNearest));
                    break;
                case (howClose(ship.angle, angleToNearest) <= -0.6):
                    ship.turnRight(ship.turningSpeed * 0.1);
                    break;
                case (howClose(ship.angle, angleToNearest) <= -0.4):
                    ship.turnRight(ship.turningSpeed * 0.1 / 3 * 2);
                    break;
                case (howClose(ship.angle, angleToNearest) <= -0.2):
                    ship.turnRight(ship.turningSpeed * 0.1 / 3);
                    break;
                case (howClose(ship.angle, angleToNearest) < 0):
                    ship.turnRight(howClose(ship.angle, angleToNearest));
                    break;
                default:
                    ship.stopTurning();
            }

            if (howClose(ship.angle, angleToNearest) <= 0.3 && howClose(ship.angle, angleToNearest) >= -0.3) {
                ship.startThrusting(0.5);
            } else if (howClose(ship.angle, angleToNearest) <= 0.15 && howClose(ship.angle, angleToNearest) >= -0.15) {
                ship.startThrusting(0.8);
            } else if (howClose(ship.angle, angleToNearest) <= 0.1 && howClose(ship.angle, angleToNearest) >= -0.1) {
                ship.startThrusting(1);
            } else {
                ship.stopThrusting();
            }

            if (!hit) {
                ship.update();
                context.save();
                ship.draw(context);
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
            context.translate(ships[index].position.getX(), ships[index].position.getY());
            context.beginPath();
            context.arc(0, 0, 20, 0, 2 * Math.PI);
            context.fillStyle = "#ff6b1b";
            context.fill();
            context.restore();
            ships.splice(index, 1);
            deadShips.pop();
        }
        requestAnimationFrame(update);
    }
};
