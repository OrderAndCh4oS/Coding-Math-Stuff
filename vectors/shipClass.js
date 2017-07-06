var shipClass = {
    position: null,
    velocity: null,
    gravity: null,
    thrust: null,
    thrusting: false,
    mass: 1,
    radius: 0,
    bounce: -1,
    angle: 0,
    direction: "left",
    turningCountdown: 0,
    thrustingCountdown: 0,
    colour: "#ff00ff",
    friction: 1,

    create: function(x, y, speed, direction, gravity) {
        var obj = Object.create(this);
        obj.position = vector.create(x, y);
        obj.velocity = vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0, gravity || 0);
        return obj;
    },

    accelerate: function(accel) {
        this.velocity.addTo(accel);
    },

    predictedAcceleration: function() {
        var ghostShip = particle.create(this.position.getX(), this.position.getY(), this.velocity.getLength(), this.velocity.getAngle(), this.gravity);
        var thrust = this.setThrust();
        ghostShip.accelerate(thrust);
        return ghostShip;
    },

    setThrust: function () {
        var thrust = vector.create(0, 0);

        if (this.isThrusting()) {
            thrust.setLength(0.1);
        } else {
            thrust.setLength(0);
        }

        thrust.setAngle(this.angle);
        return thrust;
    },

    update: function() {
        var thrust = this.setThrust();
        this.velocity.multiplyBy(this.friction);
        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
        this.accelerate(thrust);
    },

    draw: function(context) {
        context.translate(this.position.getX(), this.position.getY());
        context.rotate(this.angle);
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if (this.thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-15, 0);
        }
        context.strokeStyle = this.colour;
        context.stroke();
        context.fillStyle = this.colour;
        context.fill();
    },

    angleTo: function(p2) {
        return Math.atan2(
                p2.position.getY() - this.position.getY(),
                p2.position.getX() - this.position.getX()
                );
    },

    distanceTo: function(p2) {
        var dx = p2.position.getX() - this.position.getX(),
            dy = p2.position.getY() - this.position.getY();
        return Math.sqrt(dx * dx + dy * dy);
    },

    gravitateTo: function(p2) {
        var gravity = vector.create(0, 0),
            dist = this.distanceTo(p2);

        gravity.setLength(p2.mass / (dist * dist));
        gravity.setAngle(this.angleTo(p2));

        this.velocity.addTo(gravity);
    },

    incrementAngle: function(increment) {
        this.angle += increment;
    },

    startThrusting: function () {
      this.thrusting = true;
    },

    stopThrusting: function () {
      this.thrusting = false;
    },

    isThrusting: function() {
        return this.thrusting;
    },

    turnLeft: function (turnSpeed) {
        this.incrementAngle(-turnSpeed);
    },

    turnRight: function (turnSpeed) {
        this.incrementAngle(turnSpeed);
    },

    stopTurning: function () {
        this.turning = false;
    },

    isTurning: function () {
        return this.turning;
    }
};
